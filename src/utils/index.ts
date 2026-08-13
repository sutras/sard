import { createBemStruct, defaultBemConfig } from 'sard'

export const createBem = createBemStruct({
  ...defaultBemConfig,
  namespace: 'doc',
})

export function isMobileDevices() {
  return (
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1
  )
}
