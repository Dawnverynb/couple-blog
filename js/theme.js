/* 日夜模式：点击菜单里的按钮在 日间 / 夜间 间切换，记忆到 localStorage。 */
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const KEY = "siteTheme";

  function apply(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("dark", dark);
    btn.textContent = dark ? "☀️ 日间" : "🌙 夜间";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
  }

  // 初始状态：localStorage 优先，否则跟随系统偏好
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    saved = "dark";
  }
  apply(saved === "dark" ? "dark" : "light");

  btn.addEventListener("click", function (e) {
    e.stopPropagation(); // 避免触发菜单的点击外部关闭逻辑
    const dark = !document.body.classList.contains("dark");
    apply(dark ? "dark" : "light");
    try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch (e) {}
  });
})();
