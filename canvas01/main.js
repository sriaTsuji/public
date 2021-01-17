// 画面の高さと幅
let width = 0;
let height = 0;
// canvas 要素
let canvas = null;
let context = null;

// 初期化処理
const init = function () {
  // 画面の横幅・高さを取得
  width = window.innerWidth;
  height = window.innerHeight;

  // canvas を生成
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  // 原点を移動
  context.translate(width / 2, height / 2);
  // y軸のプラス・マイナスを反転する
  context.scale(1, -1);

  // 背景を描画
  context.fillStyle = '#0099cc';
  context.fillRect(-(width / 2), -(height / 2), canvas.width, canvas.height);
};

// 円を描く処理
const drawCircle = function (x, y, radius = 10, color = '#000000') {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
  context.stroke();
};

// 線分を描く処理
const drawLine = function (startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
};

// 四角形を描く処理
const drawRect = function (x, y, width = 20, height = 20, color = '#000000') {
  context.beginPath();
  context.rect(x, y, width, height);
  context.fillStyle = color;
  context.fill();
  context.stroke();
};

// 度をラジアンに変換する処理
const convertToRadian = function (degree) {
  return degree * (Math.PI / 180);
};

// 画面の中心を原点として、target を線形変換（回転）し、変換後の位置を返却する
const linearTransformation = function (target, degree) {
  // ラジアンを取得
  const radian = convertToRadian(degree);

  // 線形変換後のオブジェクトを返却する
  return {
    x: target.x * Math.cos(radian) + target.y * -Math.sin(radian),
    y: target.x * Math.sin(radian) + target.y * Math.cos(radian),
  };
};

window.onload = function () {
  // 初期化処理
  init();
  // 原点を描画
  drawCircle(0, 0, 4, '#000000');
  // y軸を描画
  drawLine(0, -(height / 2), 0, height / 2);
  // x軸を描画
  drawLine(-(width / 2), 0, width / 2, 0);

  // 線形変換前の点オブジェクト
  const rect01 = {
    x: 75,
    y: 75,
  };
  // ボックスの大きさ
  const boxSize = 20;

  // 線形変換前のオブジェクトを描画
  drawRect(rect01.x - boxSize / 2, rect01.y - boxSize / 2, boxSize, boxSize, 'red');

  // 角度45°で線形変換する
  const rect02 = linearTransformation(rect01, 45);
  // 線形変換後のオブジェクトを描画
  drawRect(rect02.x - boxSize / 2, rect02.y - boxSize / 2, boxSize, boxSize, 'blue');

  // 角度135°で線形変換する
  const rect03 = linearTransformation(rect01, 135);
  drawRect(rect03.x - boxSize / 2, rect03.y - boxSize / 2, boxSize, boxSize, 'green');
};
