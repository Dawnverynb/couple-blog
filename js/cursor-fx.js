/* 鼠标跟随掉落特效：在光标位置生成 ✨ / 💕 / 🐾，向下漂移 + 随机水平摆动 + 缩小淡出。
 * - 节流：两次生成最小间隔 110ms，避免鼠标滑动瞬间产生大量节点
 * - 移除：动画约 1.5s 结束后从 DOM 移除，防止堆积卡顿
 * - 尊重 prefers-reduced-motion：用户开启「减少动态效果」时关闭特效
 */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const EMOJIS = ["✨", "💕", "🐾"];
  const MIN_INTERVAL = 110; // ms，触发频率限制
  let last = 0;

  document.addEventListener("mousemove", function (e) {
    const now = Date.now();
    if (now - last < MIN_INTERVAL) return; // 节流
    last = now;

    const el = document.createElement("div");
    el.className = "cursor-fx";
    el.textContent = EMOJIS[(Math.random() * EMOJIS.length) | 0];
    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";
    el.style.setProperty("--fx-x", (Math.random() * 60 - 30).toFixed(1) + "px"); // 随机水平摆动幅度
    el.style.fontSize = (16 + Math.random() * 16).toFixed(0) + "px";
    document.body.appendChild(el);

    // 动画结束后移除节点
    setTimeout(function () { el.remove(); }, 1500);
  });
})();
