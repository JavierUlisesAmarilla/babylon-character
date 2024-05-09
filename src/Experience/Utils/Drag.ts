/* eslint-disable indent */
import * as BABYLON from 'babylonjs'
import { Experience } from '../Experience'
import { EventEmitter } from './EventEmitter'

export class Drag extends EventEmitter {
  experience
  canvas
  scene
  camera
  startingPoint!: BABYLON.Nullable<BABYLON.Vector3>
  currentMesh!: BABYLON.AbstractMesh
  dragPlane!: BABYLON.AbstractMesh

  constructor() {
    super()

    this.experience = new Experience()
    this.canvas = this.experience.canvas
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    this.scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
        case BABYLON.PointerEventTypes.POINTERDOWN:
          if (pointerInfo.pickInfo?.hit && pointerInfo.pickInfo.pickedMesh && pointerInfo.pickInfo.pickedMesh != this.dragPlane) {
            this.onPointerDown(pointerInfo.pickInfo.pickedMesh)
          }
          break
        case BABYLON.PointerEventTypes.POINTERUP:
          this.onPointerUp()
          break
        case BABYLON.PointerEventTypes.POINTERMOVE:
          this.onPointerMove()
          break
      }
    })
  }

  getGroundPosition() {
    if (!this.dragPlane) {
      return null
    }
    const pickInfo = this.scene.pick(this.scene.pointerX, this.scene.pointerY, (mesh: BABYLON.AbstractMesh) => { return mesh === this.dragPlane })
    if (pickInfo?.hit) {
      return pickInfo.pickedPoint
    }
    return null
  }

  onPointerDown(mesh: BABYLON.AbstractMesh) {
    this.currentMesh = mesh
    this.startingPoint = this.getGroundPosition()

    if (this.startingPoint) {
      setTimeout(() => {
        this.camera.detachControl()
      }, 0)
      this.trigger('pointerDown', [mesh])
    }
  }

  onPointerUp() {
    if (this.startingPoint) {
      this.camera.attachControl(this.canvas, true)
      this.startingPoint = null
      this.trigger('pointerUp')
    }
  }

  onPointerMove() {
    const curPos = this.getGroundPosition()

    if (curPos) {
      let diff = BABYLON.Vector3.Zero()
      if (this.startingPoint) {
        diff = curPos.subtract(this.startingPoint)
      }
      this.trigger('pointerMove', [this.currentMesh, diff, curPos])
      this.startingPoint = curPos
    }
  }
}
