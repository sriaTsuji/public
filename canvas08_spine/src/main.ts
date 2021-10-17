import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'

const app = new PIXI.Application({
  backgroundAlpha: 0.5,
  backgroundColor: 0x1099bb,
  height: window.innerHeight,
  width: window.innerWidth
})

document.body.appendChild(app.view)

// zunkoのspineデータを読み込んだ後のコールバック関数
const onAssetsLoaded = (loader: any, res: any) => {
  // Spine インスタンスを生成
  const zunko = new Spine(res.zunko.spineData)
  // zunkoの位置をセット
  zunko.x = app.screen.width / 2
  zunko.y = app.screen.height
  // zunkoの大きさをセット
  zunko.scale.set(0.75)
  // stage にzunkoを追加
  app.stage.addChild(zunko)
  // 初期アニメーションとして idle をセット
  zunko.state.setAnimation(0, 'idle', true)
  // 他アニメーションをセット
  zunko.state.addAnimation(1, 'white_flag_hand', false, 0)
  zunko.state.addAnimation(2, 'red_flag_hand', false, 0)
  zunko.state.tracks[1].alpha = 0
  zunko.state.tracks[2].alpha = 0

  // ブラウザ上でのマウスの位置を検知する
  window.addEventListener('mousemove', (event) => {
    // マウスが、どの象限か取得
    const resultOrthant = getOrthant({
      canvasSize: {
        x: window.innerWidth,
        y: window.innerHeight
      },
      currentPosition: {
        x: event.clientX,
        y: event.clientY
      }
    })
    // 画面の高さを100%として、マウスの位置を百分率で取得
    const heightPercentage = Math.round(
      getPercentage(window.innerHeight, event.clientY)
    )
    // 各アニメーションの alpha 値を更新
    switch (resultOrthant) {
      // 第1・4象限（画面右側）
      case 1:
      case 4:
        zunko.state.tracks[1].alpha = (100 - heightPercentage) / 100
        zunko.state.tracks[2].alpha = 0
        break
      // 第2・3象限（画面左側）
      case 2:
      case 3:
        zunko.state.tracks[2].alpha = (100 - heightPercentage) / 100
        zunko.state.tracks[1].alpha = 0
        break
      default:
        zunko.state.tracks[1].alpha = 0
        zunko.state.tracks[2].alpha = 0
        break
    }
  })
}

// zunkoのspineデータを読み込む
app.loader.add('zunko', '/illust_zunko_flag.json').load(onAssetsLoaded)

/**
 * getCenterPosition
 * 中心点を取得する
 * @param {{ x: number; y: number; }} 要素の座標
 * @return {{ x: number; y: number; }}
 */
const getCenterPosition = ({ x, y }: { x: number; y: number }) => {
  return {
    x: Math.round(x / 2),
    y: Math.round(y / 2)
  }
}

/**
 * getOrthant
 * マウスの位置から、どの象限かを取得する
 * @param {{ x: number; y: number; }} canvasSize canvas のサイズ
 * @param {{ x: number; y: number; }} currentPosition mouse の現在位置
 * @return {number} 1〜4
 */
const getOrthant = ({
  canvasSize,
  currentPosition
}: {
  canvasSize: { x: number; y: number }
  currentPosition: { x: number; y: number }
}) => {
  // canvas の中心点
  const centerPosition = getCenterPosition({ x: canvasSize.x, y: canvasSize.y })

  if (currentPosition.x >= centerPosition.x) {
    return currentPosition.y <= centerPosition.y ? 1 : 4
  } else {
    return currentPosition.y <= centerPosition.y ? 2 : 3
  }
}

/**
 * getPercentage
 * 全体（all）を元にして、部分（part）の百分率を求める
 * @param {number} all 100%にする値
 * @param {number} part 求める値
 * @return {number}
 */
const getPercentage = (all: number, part: number) => {
  return (part * 100) / all
}
