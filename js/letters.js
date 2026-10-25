/* 情书列表：读取 letters-data.js 中的 window.LETTERS，渲染卡片并支持点击弹出模态框。 */
const letters = window.LETTERS || [];
const grid = document.getElementById("letterGrid");

letters.forEach((item) => {
  const card = document.createElement("div");
  card.className = "letter-card";
  card.innerHTML =
    '<div class="env">💌</div>' +
    '<div class="lt-title">' + escapeHtml(item.title) + "</div>" +
    '<div class="lt-preview">' + escapeHtml(item.preview) + "</div>";
  card.addEventListener("click", () => openLetter(item));
  grid.appendChild(card);
});

// 模态框逻辑
const modal = document.getElementById("letterModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openLetter(item) {
  modalTitle.textContent = item.title;
  modalBody.textContent = item.content;
  modal.classList.add("open");
}
function closeLetter() {
  modal.classList.remove("open");
}
document.getElementById("modalClose").addEventListener("click", closeLetter);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeLetter();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLetter();
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
