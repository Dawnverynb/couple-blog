/* 在 #decoLayer 中生成漂浮的爱心与星星装饰（所有页面复用） */
(function () {
  const symbols = ["💗", "💕", "💖", "⭐", "🌟", "✨", "🌸", "🐰"];
  const layer = document.getElementById("decoLayer");
  if (!layer) return;
  for (let i = 0; i < 18; i++) {
    const s = document.createElement("div");
    s.className = "deco";
    s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 16 + Math.random() * 22 + "px";
    s.style.animationDuration = 8 + Math.random() * 10 + "s";
    s.style.animationDelay = -Math.random() * 15 + "s";
    layer.appendChild(s);
  }
})();
