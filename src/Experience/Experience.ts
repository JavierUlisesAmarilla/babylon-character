/* eslint-disable @typescript-eslint/no-this-alias */
import * as BABYLON from 'babylonjs'
import { Character } from './Character'

let instance: Experience

export class Experience {
  canvas!: HTMLCanvasElement
  engine!: BABYLON.Engine
  scene!: BABYLON.Scene
  camera!: BABYLON.ArcRotateCamera
  hemisphericLight!: BABYLON.HemisphericLight
  character!: Character

  constructor() {
    if (instance) {
      return instance
    }
    instance = this
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.engine = new BABYLON.Engine(this.canvas, true)
    this.scene = new BABYLON.Scene(this.engine)
    this.camera = new BABYLON.ArcRotateCamera('ArcRotateCamera', -0.5 * Math.PI, 0.5 * Math.PI, 3, new BABYLON.Vector3(0, 0, 0))
    this.camera.wheelPrecision = 300
    this.camera.minZ = 0
    this.camera.attachControl(this.canvas, true)
    this.camera.target = new BABYLON.Vector3(0, 0, 0)
    this.hemisphericLight = new BABYLON.HemisphericLight('HemisphericLight', new BABYLON.Vector3(-1, 0, 0), this.scene)

    this.engine.runRenderLoop(() => {
      instance.update()
    })

    window.addEventListener('resize', () => {
      instance.resize()
    })

    // Assets
    this.character = new Character()

    // Utils
    // new BABYLON.Debug.AxesViewer(this.scene, 1)
  }

  update() {
    this.scene?.render()
    this.character.update()
  }

  resize() {
    this.engine?.resize()
  }
}
