import * as BABYLON from 'babylonjs'
import { Experience } from '../Experience'
import { EventEmitter } from './EventEmitter'

export class Highlight extends EventEmitter {
  experience
  scene
  highlightLayer

  constructor() {
    super()

    this.experience = new Experience()
    this.scene = this.experience.scene
    this.highlightLayer = new BABYLON.HighlightLayer('highlight', this.scene)
  }

  addMeshes(meshes: BABYLON.Mesh[], color: BABYLON.Color3) {
    meshes.forEach((mesh: BABYLON.Mesh) => {
      this.highlightLayer.addMesh(mesh, color)
    })
  }
}
