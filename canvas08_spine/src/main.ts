import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'

const app = new PIXI.Application({
  backgroundAlpha: 0.5,
  backgroundColor: 0x1099bb,
  height: window.innerHeight,
  width: window.innerWidth
})

document.body.appendChild(app.view)

/**
 * onAssetsLoaded
 * 東北ずん子のspineデータ（zunko）を読み込んだ後に発火させる関数
 * @param {object} loader
 * @param {object} res
 */
const onAssetsLoaded = (loader: any, res: any) => {
  // Spine インスタンスを生成
  const zunko = new Spine(res.zunko.spineData)
  // zunkoの位置をセット
  zunko.x = app.screen.width / 2
  zunko.y = app.screen.height
  // zunkoの大きさをセット
  zunko.scale.set(0.75)
  // stageにzunkoを追加
  app.stage.addChild(zunko)
  // 初期アニメーションとして、idleをセット
  zunko.state.setAnimation(0, 'idle', true)
  // 他アニメーションをセット
  zunko.state.addAnimation(1, 'white_flag_hand', false, 0)
  zunko.state.addAnimation(2, 'red_flag_hand', false, 0)
  // 他アニメーションのアルファ値を0にする
  zunko.state.tracks[1].alpha = 0
  zunko.state.tracks[2].alpha = 0

  // 画面上のマウスの位置を検知する処理
  window.addEventListener('mousemove', (event) => {
    // マウスが画面の右側か左側かを取得
    const mousePositon = getMousePosition(window.innerWidth, event.clientX)
    // マウスの位置の高さ（比率）を取得
    const heightRatio = getRatio(window.innerHeight, event.clientY)
    // 各アニメーションのアルファ値を更新
    switch (mousePositon) {
      // 画面右側
      case 'right':
        zunko.state.tracks[1].alpha = 1 - heightRatio
        zunko.state.tracks[2].alpha = 0
        break
      // 画面左側
      case 'left':
        zunko.state.tracks[2].alpha = 1 - heightRatio
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
 * getMousePosition
 * マウスの位置が画面の右側か左側かを取得する
 * @param {number} allWidth 全体サイズ
 * @param {number} currentPositionX マウスの現在位置のXの値
 * @return {"right" | "left"}
 */
const getMousePosition = (allWidth: number, currentPositionX: number) => {
  return currentPositionX >= Math.round(allWidth / 2) ? 'right' : 'left'
}

/**
 * getRatio
 * 全体（all）を元にして、部分（part）の比率を取得する
 * @param {number} all 全体
 * @param {number} part 部分
 * @return {number} 0〜1。小数点第二位まで含む。
 */
const getRatio = (all: number, part: number) => {
  return Math.round((part / all) * 100) / 100
}
