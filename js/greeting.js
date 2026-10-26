/* greeting.js — 首页按时段展示的轻量欢迎语提示（完全独立，不依赖 welcome.js 或任何其他脚本）。
 *
 * 配置说明（见下方 greetingConfig）：
 *   enable  : 是否展示欢迎语，true 才展示
 *   default : 当前小时未匹配到任何时间段时使用的回退文案
 *   duration: 提示自动消失时长（毫秒），可配置；到时自动淡出（无手动关闭）
 *   list    : 时间段列表，按 startTime~endTime（含两端，24 小时制）匹配当前小时
 *
 * 行为：
 *   - 仅在首页展示（脚本只挂在首页，并附加 pathname 守卫做双重保险）
 *   - 页面加载后依据当前小时匹配对应欢迎文案；无匹配项回退 default
 *   - 仅 enable 为 true 时展示
 *   - 轻量单行提示：duration 毫秒后自动淡出并移除；无关闭按钮、无手动关闭
 *   - 样式由本文件自行注入，无需 common.css 配合，零耦合
 */
const greetingConfig = {
  enable: true,
  default: "晚上好👋",
  duration: 4000,
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
  function isHome() {
    const p = location.pathname;
    return p === "/" || p.endsWith("/") || p.endsWith("index.html");
  }
  if (!isHome()) return;

  if (!document.getElementById("greetingStyle")) {
    const style = document.createElement("style");
    style.id = "greetingStyle";
    style.textContent =
      ".greeting-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;pointer-events:none;}" +
      ".greeting-toast{background:rgba(255,255,255,.96);border:2px solid var(--pink-deep);border-radius:999px;" +
      "padding:12px 26px;color:var(--pink-text);font-size:17px;font-weight:600;line-height:1.4;" +
      "box-shadow:0 10px 30px rgba(196,88,122,.35);max-width:88vw;" +
      "transform:translateY(14px) scale(.96);opacity:0;transition:opacity .4s ease,transform .4s ease;}" +
      ".greeting-overlay.open .greeting-toast{opacity:1;transform:translateY(0) scale(1);}";
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
    const toast = document.createElement("div");
    toast.className = "greeting-toast";
    toast.textContent = pickGreeting();
    overlay.appendChild(toast);
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

    requestAnimationFrame(() => overlay.classList.add("open"));
    const duration = typeof greetingConfig.duration === "number" ? greetingConfig.duration : 4000;
    timer = setTimeout(close, duration);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showGreeting);
  } else {
    showGreeting();
  }
})();
