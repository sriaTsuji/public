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

// 多角形を描く処理
const drawPolygon = function (points, color = '#000000') {
  if (!Array.isArray(points)) return;
  if (points.length < 3) return;

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    context.lineTo(points[i].x, points[i].y);
  }
  context.closePath();

  context.fillStyle = color;
  context.fill();
  context.stroke();
};

// 度をラジアンに変換する処理
const convertToRadian = function (degree) {
  return degree * (Math.PI / 180);
};

// 反時計周りに回転させる処理
const rotationTransformation = function (target, degree, basicPoint = { x: 0, y: 0 }) {
  // ラジアンを取得
  const radian = convertToRadian(degree);

  // まず中心点を原点に移動した上で、線形変換を行う
  // x' = (x - a) * cosθ + (y - b) * -sinθ
  // y' = (x - a) * cosθ + (y - b) * sinθ
  const firstTransformation = {
    x: (target.x - basicPoint.x) * Math.cos(radian) + (target.y - basicPoint.y) * -Math.sin(radian),
    y: (target.x - basicPoint.x) * Math.sin(radian) + (target.y - basicPoint.y) * Math.cos(radian),
  };

  // firstTransformationに、中心点のx,yを加算した点を返す
  return {
    x: firstTransformation.x + basicPoint.x,
    y: firstTransformation.y + basicPoint.y,
  };
};

// x軸に対して反転する処理
const inversionXTransformation = function (target) {
  return {
    x: target.x * 1 + target.y * 0,
    y: target.x * 0 + target.y * -1,
  };
};

// y軸に対して反転する処理
const inversionYTransformation = function (target) {
  return {
    x: target.x * -1 + target.y * 0,
    y: target.x * 0 + target.y * 1,
  };
};

// targetのx,yをnx, ny倍する処理
const multipeTransformation = function (target, nx = 1, ny = 1) {
  return {
    x: target.x * nx + target.y * 0,
    y: target.x * 0 + target.y * ny,
  };
};

// x軸からθ°でせん断する処理
const shearXTransformation = function (target, degree = 0) {
  const radian = convertToRadian(degree);
  return {
    x: target.x * 1 + target.y * 0,
    y: target.x * Math.tan(radian) + target.y * 1,
  };
};

// y軸からθ°でせん断する処理
const shearYTransformation = function (target, degree = 0) {
  const radian = convertToRadian(degree);
  return {
    x: target.x * 1 + target.y * Math.tan(radian),
    y: target.x * 0 + target.y * 1,
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

  // 回転の中心点
  const basicPoint = {
    x: 80,
    y: 120,
  };
  // 線形変換前の点オブジェクト
  const rect01 = {
    x: 75,
    y: 75,
  };
  // ボックスの大きさ
  const boxSize = 20;

  // 線形変換前のオブジェクトを描画する
  drawRect(rect01.x - boxSize / 2, rect01.y - boxSize / 2, boxSize, boxSize, 'red');

  // x軸に対して反転する
  const rectInversionX = inversionXTransformation(rect01);
  // x軸に対して反転したボックスを描画する
  drawRect(rectInversionX.x - boxSize / 2, rectInversionX.y - boxSize / 2, boxSize, boxSize, 'blue');

  // y軸に対して反転する
  const rectInversionY = inversionYTransformation(rect01);
  // y軸に対して反転したボックスを描画する
  drawRect(rectInversionY.x - boxSize / 2, rectInversionY.y - boxSize / 2, boxSize, boxSize, 'green');

  // x,yの位置を2倍する
  const rectMultiplx2 = multipeTransformation(rect01, 2, 2);
  // x,yの位置を2倍したボックスを描画する
  drawRect(rectMultiplx2.x - boxSize / 2, rectMultiplx2.y - boxSize / 2, boxSize, boxSize, 'orange');

  // 点オブジェクトの配列（正方形）
  const rect02 = [
    { x: 0, y: 0 },
    { x: 0, y: 20 },
    { x: 20, y: 20 },
    { x: 20, y: 0 },
  ];

  // x軸から60°せん断した正方形を生成する
  const rectShearX = [shearXTransformation(rect02[0], 60), shearXTransformation(rect02[1], 60), shearXTransformation(rect02[2], 60), shearXTransformation(rect02[3], 60)];
  // x軸から60°せん断した正方形を描画する
  drawPolygon(rectShearX, 'pink');

  // y軸から60°せん断した正方形を生成する
  const rectShearY = [shearYTransformation(rect02[0], 60), shearYTransformation(rect02[1], 60), shearYTransformation(rect02[2], 60), shearYTransformation(rect02[3], 60)];
  // y軸から60°せん断した正方形を描画する
  drawPolygon(rectShearY, 'white');
};
