/* 右上角菜单：点击按钮展开/收起，点击外部或按 Esc 关闭。 */
(function () {
  const btn = document.getElementById("menuBtn");
  const panel = document.getElementById("menuPanel");
  if (!btn || !panel) return;

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.classList.toggle("open", open);
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!panel.classList.contains("open"));
  });

  document.addEventListener("click", (e) => {
    if (panel.classList.contains("open") && !panel.contains(e.target) && e.target !== btn) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
})();
