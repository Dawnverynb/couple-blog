/* 照片墙：把下面的文件名换成你自己的图片即可（支持 jpg/png/webp 等）。
   把照片放进 images/ 文件夹，然后在这里的数组里添加对应路径。 */
const photoFiles = [
  "images/photo-01.svg",
  "images/photo-02.svg",
  "images/photo-03.svg",
  "images/photo-04.svg",
  "images/photo-05.svg",
  "images/photo-06.svg",
  "images/photo-07.svg",
  "images/photo-08.svg",
  "images/photo-09.svg",
];

// 图片缺失时的占位（淡粉底 + 提示文字）
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
      '<rect width="400" height="400" fill="#ffe3ec"/>' +
      '<text x="200" y="210" font-size="28" fill="#c4587a" text-anchor="middle" ' +
      'font-family="sans-serif">图片待上传</text></svg>'
  );

const grid = document.getElementById("photoGrid");
photoFiles.forEach((src) => {
  const fig = document.createElement("figure");
  const img = document.createElement("img");
  img.src = src;
  img.alt = "我们的照片";
  img.loading = "lazy";
  img.onerror = function () {
    this.onerror = null;
    this.src = FALLBACK;
  };
  img.addEventListener("click", () => openLightbox(src));
  fig.appendChild(img);
  grid.appendChild(fig);
});

// 简单灯箱
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("open");
}
lightbox.addEventListener("click", () => lightbox.classList.remove("open"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") lightbox.classList.remove("open");
});
