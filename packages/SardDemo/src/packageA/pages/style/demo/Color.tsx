import { View } from '@tarojs/components'
import { Space } from 'sard'
import classNames from 'classnames'

import '../index.scss'

function renderBox(color: string) {
  return (
    <View key={color} style={{ display: 'flex', flexDirection: 'row' }}>
      {Array(9)
        .fill(0)
        .map((_, i, arr) => {
          return (
            <View
              key={i}
              className={classNames(
                'demo-color-box',
                `demo-${color}-${100 * (arr.length - i)}-bg`,
              )}
            />
          )
        })}
    </View>
  )
}

const themeList = [
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
  'gray',
]

export default () => {
  return (
    <Space>
      {themeList.map((color) => {
        return renderBox(color)
      })}
    </Space>
  )
}
