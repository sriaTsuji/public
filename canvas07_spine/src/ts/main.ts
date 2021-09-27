import * as PIXI from 'pixi.js'
import { Spine } from 'pixi-spine'

const app = new PIXI.Application({
  width: 220,
  height: 300,
  backgroundAlpha: 0
})

document.getElementById('canvasWrapper')!.appendChild(app.view)

const onAssetsLoaded = (loader: any, res: any) => {
  // Spineのインスタンスを生成
  const zunko = new Spine(res.zunko.spineData)
  // zunko（東北ずん子）の大きさを調整
  zunko.scale.set(0.5)
  // zunkoの位置をセット
  zunko.x = app.screen.width / 2 - 20
  zunko.y = app.screen.height
  // zunkoをPIXIのstageに追加
  app.stage.addChild(zunko)

  // 初期アニメーションとしてidleをセット
  let currentAnimation = 'idle'
  let isCurrentAnimationIdle = currentAnimation === 'idle'
  // アニメーションスタート
  zunko.state.setAnimation(0, currentAnimation, isCurrentAnimationIdle)

  // zunkoを押下した時のイベントをセット
  app.stage.on('pointerdown', () => {
    isCurrentAnimationIdle = currentAnimation === 'idle'
    currentAnimation = isCurrentAnimationIdle ? 'pose' : 'idle';
    zunko.state.setAnimation(0, currentAnimation, !isCurrentAnimationIdle)
  })
}

// 東北ずん子の spine データを読み込む
app.loader.add('zunko', '/assets/spine/zunko.json').load(onAssetsLoaded)
// マウス・タッチ操作をONにする
app.stage.interactive = true