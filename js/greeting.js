/* greeting.js — 按时段展示的欢迎语弹窗（完全独立，不依赖 welcome.js 或任何其他脚本）。
 *
 * 配置说明（见下方 greetingConfig）：
 *   enable  : 是否展示欢迎语弹窗，true 才展示
 *   default : 当当前小时未匹配到任何时间段时使用的回退文案
 *   duration: 弹窗自动消失时长（毫秒），可配置；到时自动淡出
 *   list    : 时间段列表，按 startTime~endTime（含两端，24 小时制）匹配当前小时
 *
 * 行为：
 *   - 页面加载后依据当前小时匹配对应欢迎文案；无匹配项回退 default
 *   - 仅 enable 为 true 时展示
 *   - 弹窗非永久存在：duration 毫秒后自动淡出并移除；也可手动关闭（× / 点背景 / Esc）
 *   - 样式由本文件自行注入，无需 common.css 配合，零耦合
 */
const greetingConfig = {
  enable: true,
  default: "晚上好👋",
  duration: 5000,
  list: [
       { greeting: "丁香结年年有，睡不着直接打电话给我", startTime: 0, endTime: 5 },
    { greeting: "起这么早干嘛，回去重睡", startTime: 6, endTime: 9 },
    { greeting: "兜兜转转的重逢，是浪漫的开始", startTime: 10, endTime: 10 },
    { greeting: "小宝在想什么呢，记得好好吃饭", startTime: 11, endTime: 11 },
    { greeting: "吃完饭记得午睡喔，好好休息", startTime: 12, endTime: 13 },
    { greeting: "要相信花会开", startTime: 14, endTime: 14 },
    { greeting: "此处心安，是有你的地方", startTime: 15, endTime: 15 },
    { greeting: "慢慢相爱吧，我想和你有个未来", startTime: 16, endTime: 16 },
    { greeting: "再累也要记得吃饭呐", startTime: 17, endTime: 17 },
    { greeting: "也许我词不达意，但我很开心能遇见你", startTime: 18, endTime: 18 },
    { greeting: "和你在一起后，我再也没有羡慕过别人", startTime: 19, endTime: 19 },
    { greeting: "山似玉，玉如君，相看一笑温", startTime: 20, endTime: 20 },
    { greeting: "希望这份爱意撑过每个四季", startTime: 21, endTime: 21 },  
    { greeting: "明月高悬夜空，眼下是春天", startTime: 22, endTime: 22 },
    { greeting: "在写下这段字的时候，我一直在想你", startTime: 23, endTime: 23 },
    { greeting: "你是爱的中心，早点睡，晚安", startTime: 24, endTime: 24 },
  ],
};

(function () {
  // 注入弹窗样式，保证组件自包含、不依赖其他文件
  if (!document.getElementById("greetingStyle")) {
    const style = document.createElement("style");
    style.id = "greetingStyle";
    style.textContent =
      ".greeting-overlay{position:fixed;inset:0;background:rgba(196,88,122,.45);backdrop-filter:blur(4px);" +
      "display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;opacity:0;transition:opacity .4s ease;}" +
      ".greeting-overlay.open{opacity:1;}" +
      ".greeting-card{background:#fff;width:90%;max-width:420px;border-radius:24px;padding:34px 28px 30px;" +
      "text-align:center;position:relative;box-shadow:0 24px 60px rgba(196,88,122,.45);" +
      "transform:translateY(18px) scale(.96);transition:transform .4s ease;}" +
      ".greeting-overlay.open .greeting-card{transform:translateY(0) scale(1);}" +
      ".greeting-close{position:absolute;top:12px;right:16px;border:none;background:none;font-size:26px;" +
      "line-height:1;color:var(--pink-deep);cursor:pointer;}" +
      ".greeting-emoji{font-size:46px;animation:beat 1.6s ease-in-out infinite;}" +
      ".greeting-title{color:var(--pink-text);font-size:24px;margin:10px 0 8px;}" +
      ".greeting-text{color:var(--pink-muted);font-size:16px;line-height:1.8;margin:0;}";
    document.head.appendChild(style);
  }

  function pickGreeting() {
    const h = new Date().getHours();
    for (const item of greetingConfig.list) {
      if (h >= item.startTime && h <= item.endTime) return item.greeting;
    }
    return greetingConfig.default;
  }

  function showGreeting() {
    if (!greetingConfig.enable) return;
    if (document.getElementById("greetingOverlay")) return;

    const overlay = document.createElement("div");
    overlay.className = "greeting-overlay";
    overlay.id = "greetingOverlay";
    overlay.innerHTML =
      '<div class="greeting-card">' +
      '<button class="greeting-close" aria-label="关闭">×</button>' +
      '<div class="greeting-emoji">💬</div>' +
      '<h2 class="greeting-title">小问候 💕</h2>' +
      '<p class="greeting-text"></p>' +
      "</div>";
    // 用 textContent 写文案，避免特殊字符破坏结构
    overlay.querySelector(".greeting-text").textContent = pickGreeting();
    document.body.appendChild(overlay);

    let closed = false;
    let timer = null;
    function close() {
      if (closed) return;
      closed = true;
      if (timer) clearTimeout(timer);
      overlay.classList.remove("open");
      setTimeout(() => overlay.remove(), 450);
    }

    overlay.querySelector(".greeting-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", esc);
      }
    });

    requestAnimationFrame(() => overlay.classList.add("open"));
    const duration = typeof greetingConfig.duration === "number" ? greetingConfig.duration : 5000;
    timer = setTimeout(close, duration);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGreeting);
  } else {
    showGreeting();
  }
})();
