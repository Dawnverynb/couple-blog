/* 登录欢迎弹窗组件。
 * 用法：登录成功后调用 window.showWelcomeModal({ title, text, duration })
 *  - 入场动画、数秒后自动淡出、可手动提前关闭（× / 点背景 / Esc）
 *  - 不会长期驻留：淡出后自动从 DOM 移除
 * 当前站点无真实登录，故在页面加载时模拟“登录成功”触发，并用 sessionStorage
 * 保证“每次会话仅展示一次”。接入真实登录后删掉底部自动触发代码即可。 */
(function () {
  function showWelcomeModal(opts) {
    opts = opts || {};
    const title = opts.title || "欢迎回来 💕";
    const text = opts.text || "很高兴见到你，今天也要开开心心的哦～";
    const duration = typeof opts.duration === "number" ? opts.duration : 4000;

    const old = document.getElementById("welcomeModal");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.className = "welcome-overlay";
    overlay.id = "welcomeModal";
    overlay.innerHTML =
      '<div class="welcome-card">' +
      '<button class="welcome-close" aria-label="关闭">×</button>' +
      '<div class="welcome-emoji">💖</div>' +
      '<h2 class="welcome-title"></h2>' +
      '<p class="welcome-text"></p>' +
      "</div>";
    // 用 textContent 写入，避免文案里的特殊字符破坏结构
    overlay.querySelector(".welcome-title").textContent = title;
    overlay.querySelector(".welcome-text").textContent = text;
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

    overlay.querySelector(".welcome-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", esc);
      }
    });

    // 触发入场动画
    requestAnimationFrame(() => overlay.classList.add("open"));
    // 数秒后自动淡出
    timer = setTimeout(close, duration);

    return { close: close };
  }

  window.showWelcomeModal = showWelcomeModal;

  // 模拟“登录成功”：本次会话仅展示一次
  function trigger() {
    if (sessionStorage.getItem("welcomeShown")) return;
    sessionStorage.setItem("welcomeShown", "1");
    showWelcomeModal();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trigger);
  } else {
    trigger();
  }
})();
