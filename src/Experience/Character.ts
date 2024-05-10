import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import { getYLookQuat } from '../utils/common'
import { IS_WIREFRAME_VISIBLE } from '../utils/constants'
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
    // Update root transformation.
    this.root.position.set(0, -1, 0.1)
    this.root.rotationQuaternion = getYLookQuat(this.root.position, new BABYLON.Vector3(0, -1, 0))

    // Load body model.
    const bodyRoot = new BABYLON.TransformNode(this.name)
    bodyRoot.parent = this.root
    const bodyModel = await BABYLON.SceneLoader.ImportMeshAsync('', '/assets/models/', 'female_body.glb', this.experience.scene)
    const bodyMaterial = new BABYLON.StandardMaterial('BodyMaterial', this.experience.scene)
    bodyMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
    bodyMaterial.wireframe = IS_WIREFRAME_VISIBLE

    bodyModel.meshes.forEach(mesh => {
      mesh.parent = bodyRoot
      mesh.isPickable = false
      mesh.material = bodyMaterial // Make body black.
    })

    // Load head model.
    const headRoot = new BABYLON.TransformNode(this.name)
    headRoot.parent = this.root
    const headModel = await BABYLON.SceneLoader.ImportMeshAsync('', '/assets/models/', 'female_head.glb', this.experience.scene)

    headModel.meshes.forEach(mesh => {
      mesh.parent = headRoot
      mesh.isPickable = false
      if (mesh.material) {
        mesh.material.wireframe = IS_WIREFRAME_VISIBLE
      }
    })

    // Calculate head offset.
    const bodyVertexIndex = 5162
    const headVertexIndex = 12338
    const bodyMesh = this.experience.scene.getMeshByName('body')
    const headMesh = this.experience.scene.getMeshByName('mesh')

    if (bodyMesh && headMesh) {
      const bodyVertexPositions = bodyMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind)
      const bodyVertex = bodyVertexPositions?.slice(bodyVertexIndex * 3, (bodyVertexIndex + 1) * 3)
      const headVertexPositions = headMesh.getVerticesData(BABYLON.VertexBuffer.PositionKind)
      const headVertex = headVertexPositions?.slice(headVertexIndex * 3, (headVertexIndex + 1) * 3)

      if (bodyVertex && headVertex) {
        headRoot.position.x += bodyVertex[0] - headVertex[0]
        headRoot.position.y += bodyVertex[1] - headVertex[1]
        headRoot.position.z += bodyVertex[2] - headVertex[2]
      }
    }
  }
}
