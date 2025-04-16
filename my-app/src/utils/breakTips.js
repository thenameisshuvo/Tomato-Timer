// src/utils/breakTips.js
export const breakTips = [
  "💧 Drink a glass of water",
  "🧘‍♂️ Do 30 seconds of deep breathing",
  "🚶‍♀️ Take a short walk",
  "👐 Stretch your arms and shoulders",
  "👀 Rest your eyes for 20 seconds",
  "🔄 Do gentle neck rolls",
  "🪑 Stand up and stretch",
  "😌 Close your eyes and relax",
];

export const getRandomTip = () => {
  return breakTips[Math.floor(Math.random() * breakTips.length)];
};
