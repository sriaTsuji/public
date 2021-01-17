// 画面の高さと幅
let width = 0
let height = 0
// canvas 要素
let canvas = null
let context = null

// 初期化処理
const init = function () {
  // 画面の横幅・高さを取得
  width = window.innerWidth
  height = window.innerHeight

  // canvas を生成
  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height

  // 原点を移動
  context.translate(width / 2, height / 2)
  // y軸のプラス・マイナスを反転する
  context.scale(1, -1)

  // 背景を描画
  context.fillStyle = '#0099cc';
  context.fillRect(-(width / 2), -(height / 2), canvas.width,canvas.height);
}

// 円を描く処理
const drawCircle = function (x, y, radius = 10, color = "#000000") {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.fillStyle = color;
  context.fill();
  context.stroke();
}

// 線分を描く処理
const drawLine = function (startX, startY, endX, endY) {
  context.beginPath();
  context.moveTo(startX, startY)
  context.lineTo(endX, endY);
  context.stroke();
}

// 四角形を描く処理
const drawRect = function (x, y, width = 20, height = 20, color = "#000000") {
  context.beginPath();
  context.rect(x, y, width, height)
  context.fillStyle = color;
  context.fill();
  context.stroke();
}

// 度をラジアンに変換する処理
const convertToRadian = function (degree) {
  return degree *  ( Math.PI / 180 ) 
}

// basicPoint を中心点として、target を線形変換（反時計周りに回転）し、変換後の位置を返却する
const linearTransformation = function (target, degree, basicPoint = {x: 0, y: 0}) {
  // ラジアンを取得
  const radian = convertToRadian(degree)

  // まず中心点を原点に移動した上で、線形変換を行う
  // x' = (x - a) * cosθ + (y - b) * -sinθ
  // y' = (x - a) * cosθ + (y - b) * sinθ
  const firstTransformation = {
    x : (target.x - basicPoint.x) * Math.cos(radian) + (target.y - basicPoint.y) * -Math.sin(radian),
    y : (target.x - basicPoint.x) * Math.sin(radian) + (target.y - basicPoint.y) * Math.cos(radian),
  }

  // firstTransformationに、中心点のx,yを加算した点を返す
  return {
    x : firstTransformation.x + basicPoint.x,
    y : firstTransformation.y + basicPoint.y
  }
}

window.onload = function(){
  // 初期化処理
  init()
  // 原点を描画
  drawCircle(0, 0, 4, '#000000')
  // y軸を描画
  drawLine(0, - (height / 2), 0, height / 2)
  // x軸を描画
  drawLine(- (width / 2), 0, width / 2, 0)

  // 回転の中心点
  const basicPoint = {
    x: 80,
    y: 120,
  }
  // 線形変換前の点オブジェクト
  const rect01 = {
    x: 200,
    y: 200,
  }
  // ボックスの大きさ
  const boxSize = 20

  // 回転の中心点を描画
  drawCircle(basicPoint.x, basicPoint.y, 4, '#000000')

  // 線形変換前のオブジェクトを描画
  drawRect(
    rect01.x - (boxSize / 2),
    rect01.y - (boxSize / 2),
    boxSize,
    boxSize,
    'red'
  )

  // 中心点を元に60°回転させる
  const rect02 = linearTransformation(rect01, 60, basicPoint)
  // 60°回転させたボックスを描画
  drawRect(
    rect02.x - (boxSize / 2),
    rect02.y - (boxSize / 2),
    boxSize,
    boxSize,
    'blue'
  )

  // 中心点を元に120°回転させる
  const rect03 = linearTransformation(rect01, 120, basicPoint)
  // 120°回転させたボックスを描画
  drawRect(
    rect03.x - (boxSize / 2),
    rect03.y - (boxSize / 2),
    boxSize,
    boxSize,
    'green'
  )

  // 中心点を元に180°回転させる
  const rect04 = linearTransformation(rect01, 180, basicPoint)
  // 180°回転させたボックスを描画
  drawRect(
    rect04.x - (boxSize / 2),
    rect04.y - (boxSize / 2),
    boxSize,
    boxSize,
    'orange'
  )

}