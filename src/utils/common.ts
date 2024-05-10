import * as BABYLON from 'babylonjs'

export const getYLookQuat = (origin: BABYLON.Vector3, target: BABYLON.Vector3) => {
  return BABYLON.Quaternion.FromRotationMatrix(BABYLON.Matrix.LookAtLH(origin, target, BABYLON.Axis.Y).invert())
}

export const getZLookQuat = (origin: BABYLON.Vector3, target: BABYLON.Vector3) => {
  return BABYLON.Quaternion.FromRotationMatrix(BABYLON.Matrix.LookAtLH(origin, target, BABYLON.Axis.Z).invert())
}
