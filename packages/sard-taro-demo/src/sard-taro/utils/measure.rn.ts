import { UIManager, findNodeHandle } from 'react-native'

export function measure(element: any) {
  return new Promise<{
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
  }>((resolve) => {
    UIManager.measure(
      findNodeHandle(element) as any,
      (_x, _y, width, height, left, top) => {
        resolve({
          width,
          height,
          top,
          right: left + width,
          bottom: top + height,
          left,
        })
      },
    )
  })
}
