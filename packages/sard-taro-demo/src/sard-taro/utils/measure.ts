export function measure(element: any) {
  void element
  return new Promise<{
    width: number
    height: number
    top: number
    right: number
    bottom: number
    left: number
  }>((resolve) => {
    resolve({
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    })
  })
}
