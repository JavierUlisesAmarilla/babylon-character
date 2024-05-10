import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { getYLookQuat } from '../utils/common'
import { Experience } from './Experience'

export class Character {
  name = 'character'
  experience
  root
  rootChild

  constructor() {
    this.experience = new Experience()
    this.root = new BABYLON.TransformNode(this.name)
    this.rootChild = new BABYLON.TransformNode(this.name)
    this.rootChild.parent = this.root
    this.init()
  }

  async init() {
    // Root
    this.root.position.set(0, -1, 0.1)
    this.root.rotationQuaternion = getYLookQuat(this.root.position, new BABYLON.Vector3(0, -1, 0))

    // Body
    await BABYLON.SceneLoader.ImportMeshAsync('', '/assets/models/', 'female_body.glb', this.experience.scene)
    const bodyMesh = this.experience.scene.getMeshByName('body')

    if (bodyMesh) {
      bodyMesh.parent = this.rootChild
      bodyMesh.isPickable = false
      const material = new BABYLON.StandardMaterial('material', this.experience.scene)
      material.diffuseColor = new BABYLON.Color3(0, 0, 0)
      bodyMesh.material = material
    }
  }
}
