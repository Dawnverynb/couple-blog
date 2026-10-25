/* 爱心点击小游戏：10 秒内点击随机出现的爱心，结束后显示得分与俏皮话。 */
const playArea = document.getElementById("playArea");
const playHint = document.getElementById("playHint");
const timeLeftEl = document.getElementById("timeLeft");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const resultModal = document.getElementById("resultModal");
const finalScore = document.getElementById("finalScore");
const resultMsg = document.getElementById("resultMsg");
const againBtn = document.getElementById("againBtn");

const GAME_TIME = 10; // 秒
let score = 0;
let timeLeft = GAME_TIME;
let spawnTimer = null;
let countdownTimer = null;
let running = false;

function playfulMessage(s) {
  if (s <= 5) return "才点这么点，是不是手抖啦 😜 再来一次嘛～";
  if (s <= 15) return "还不错嘛，不过手速还能再练练哦 💪";
  if (s <= 30) return "手速可以呀，心动加速度 💓 你超甜的！";
  if (s <= 50) return "哇，你是点到手抽筋了吗 🤭 TA 要被你宠坏了～";
  return "爱心收割机本机！💖 这波狗粮我吃定了！";
}

function spawnHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() < 0.5 ? "💗" : "💕";
  const size = 28 + Math.random() * 30;
  heart.style.fontSize = size + "px";
  heart.style.left = 5 + Math.random() * 88 + "%";
  heart.style.top = 5 + Math.random() * 82 + "%";
  let clicked = false;
  heart.addEventListener("click", () => {
    if (clicked) return;
    clicked = true;
    score++;
    scoreEl.textContent = score;
    heart.classList.add("clicked");
    setTimeout(() => heart.remove(), 200);
  });
  // 没点中也会自动消失，避免堆满屏幕
  setTimeout(() => {
    if (!clicked) heart.remove();
  }, 1100);
  playArea.appendChild(heart);
}

function endGame() {
  running = false;
  clearInterval(spawnTimer);
  clearInterval(countdownTimer);
  spawnTimer = countdownTimer = null;
  playArea.querySelectorAll(".heart").forEach((h) => h.remove());
  finalScore.textContent = score;
  resultMsg.textContent = playfulMessage(score);
  resultModal.classList.add("open");
  startBtn.disabled = false;
  startBtn.textContent = "开始游戏 💗";
}

function startGame() {
  if (running) return;
  running = true;
  score = 0;
  timeLeft = GAME_TIME;
  scoreEl.textContent = "0";
  timeLeftEl.textContent = GAME_TIME;
  playHint.style.display = "none";
  startBtn.disabled = true;
  startBtn.textContent = "游戏中…";

  spawnHeart();
  spawnTimer = setInterval(spawnHeart, 350);
  countdownTimer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

startBtn.addEventListener("click", startGame);
againBtn.addEventListener("click", () => {
  resultModal.classList.remove("open");
  startGame();
});
resultModal.addEventListener("click", (e) => {
  if (e.target === resultModal) resultModal.classList.remove("open");
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") resultModal.classList.remove("open");
});
