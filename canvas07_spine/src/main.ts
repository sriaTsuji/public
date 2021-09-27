import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'

const app = new PIXI.Application({
  backgroundAlpha: 0,
  height: 600,
  width: 600
})

document.body.appendChild(app.view)

// ずん子のspineデータを読み込んだ後のコールバック関数
const onAssetsLoaded = (loader: any, res: any) => {
  // Spine インスタンスを生成
  const zunko = new Spine(res.zunko.spineData)
  // ずん子の位置をセット
  zunko.x = app.screen.width / 2
  zunko.y = app.screen.height
  // ずん子の大きさをセット
  zunko.scale.set(0.5)
  // stage にずん子を追加
  app.stage.addChild(zunko)
  // 初期アニメーションとして idle をセット
  let currentAnimation = 'idle'
  let isCurrentAnimationIdle = currentAnimation === 'idle'
  zunko.state.setAnimation(0, currentAnimation, isCurrentAnimationIdle)

  // ずん子を押下時の処理
  app.stage.on('pointerdown', () => {
    isCurrentAnimationIdle = currentAnimation === 'idle'
    currentAnimation = isCurrentAnimationIdle === true ? 'pose' : 'idle'
    zunko.state.setAnimation(0, currentAnimation, !isCurrentAnimationIdle)
  })
}

// ずん子のspineデータを読み込む
app.loader.add('zunko', '/zunko.json').load(onAssetsLoaded)
// クリック・タップをONにする
app.stage.interactive = true
