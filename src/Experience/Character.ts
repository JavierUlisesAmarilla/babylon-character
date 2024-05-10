import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { getYLookQuat } from '../utils/common'
import { Experience } from './Experience'

export class Character {
  name = 'character'
  experience
  root

  constructor() {
    this.experience = new Experience()
    this.root = new BABYLON.TransformNode(this.name)
    this.init()
  }

  async init() {
    // Root
    this.root.position.set(0, -1, 0.1)
    this.root.rotationQuaternion = getYLookQuat(this.root.position, new BABYLON.Vector3(0, -1, 0))

    // Body
    const bodyModel = await BABYLON.SceneLoader.ImportMeshAsync('', '/assets/models/', 'female_body.glb', this.experience.scene)
    const bodyMaterial = new BABYLON.StandardMaterial('BodyMaterial', this.experience.scene)
    bodyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)

    bodyModel.meshes.forEach(mesh => {
      mesh.parent = this.root
      mesh.isPickable = false
      mesh.material = bodyMaterial
    })

    // Head
    const headModel = await BABYLON.SceneLoader.ImportMeshAsync('', '/assets/models/', 'female_head.glb', this.experience.scene)

    headModel.meshes.forEach(mesh => {
      mesh.parent = this.root
      mesh.isPickable = false
    })
  }
}
