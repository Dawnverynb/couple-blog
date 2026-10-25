/* 欢迎语配置：按当前小时显示不同文案，开启 enable 后若所有时间段都不匹配则回退 default。 */
const greetingConfig = {
  enable: true,
  default: "晚上好👋",
  list: [
    { greeting: "到点了该吃夜宵了", startTime: 0, endTime: 5 },
    { greeting: "起这么早干嘛，回去重睡", startTime: 6, endTime: 9 },
    { greeting: "有对象了吗你就看", startTime: 10, endTime: 10 },
    { greeting: "该点外卖了喂", startTime: 11, endTime: 11 },
    { greeting: "该睡觉了喂", startTime: 12, endTime: 14 },
    { greeting: "要相信花会开", startTime: 14, endTime: 18 },
    { greeting: "19点喽, 要来个美味的香辣鸡腿堡吗？🍔", startTime: 19, endTime: 19 },
    { greeting: "晚上好👋, 在属于自己的时间来一把紧张刺激的王者荣耀吧", startTime: 20, endTime: 24 },
  ],
};

function renderGreeting() {
  const box = document.getElementById("greetingBox");
  if (!box) return;
  if (!greetingConfig.enable) {
    box.textContent = "";
    return;
  }
  const h = new Date().getHours();
  let msg = greetingConfig.default;
  for (const item of greetingConfig.list) {
    if (h >= item.startTime && h <= item.endTime) {
      msg = item.greeting;
      break;
    }
  }
  box.textContent = "💬 " + msg;
}

renderGreeting();
// 每分钟检查一次，跨时间段时自动更新
setInterval(renderGreeting, 60000);
