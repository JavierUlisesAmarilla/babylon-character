import * as BABYLON from 'babylonjs'

export const getRandomTarget = (origin: BABYLON.Vector3, zOffset: number, range: number) => {
  const dX = Math.random() * range - range / 2
  const dY = Math.random() * range - range / 2
  const target = new BABYLON.Vector3(origin.x + dX, origin.y + dY, origin.z + zOffset)
  return target
}

export const getYLookQuat = (origin: BABYLON.Vector3, target: BABYLON.Vector3) => {
  return BABYLON.Quaternion.FromRotationMatrix(BABYLON.Matrix.LookAtLH(origin, target, BABYLON.Axis.Y).invert())
}

export const getZLookQuat = (origin: BABYLON.Vector3, target: BABYLON.Vector3) => {
  return BABYLON.Quaternion.FromRotationMatrix(BABYLON.Matrix.LookAtLH(origin, target, BABYLON.Axis.Z).invert())
}

export const delay = (s: number) => {
  if (s <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, s * 1e3))
}
