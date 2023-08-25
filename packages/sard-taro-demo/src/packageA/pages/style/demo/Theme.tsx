import { View } from '@tarojs/components'
import { Space } from 'sard-taro'

import '../index.scss'

export function renderColor(color: string) {
  return (
    <View
      key={color}
      className="demo-color-box"
      style={{ backgroundColor: color }}
    />
  )
}

export function renderColorRgb(rgb: string) {
  return Array(9)
    .fill(0)
    .map((_, i) => {
      return (
        <View
          key={i}
          className="demo-color-box"
          style={{ backgroundColor: `rgba(${rgb}, ${1 - 0.1 * (i + 1)})` }}
        />
      )
    })
}

export function renderThemeColor(color: string, rgb: string) {
  return (
    <Space key={color} gap={0}>
      {renderColor(color)}
      {renderColorRgb(rgb)}
    </Space>
  )
}

const themeList: [color: string, rgb: string][] = [
  ['var(--sar-primary)', 'var(--sar-primary-rgb)'],
  ['var(--sar-secondary)', 'var(--sar-secondary-rgb)'],
  ['var(--sar-success)', 'var(--sar-success-rgb)'],
  ['var(--sar-info)', 'var(--sar-info-rgb)'],
  ['var(--sar-warning)', 'var(--sar-warning-rgb)'],
  ['var(--sar-danger)', 'var(--sar-danger-rgb)'],
]

export default () => {
  return (
    <Space vertical>
      {themeList.map(([color, rgb]) => {
        return renderThemeColor(color, rgb)
      })}
    </Space>
  )
}
