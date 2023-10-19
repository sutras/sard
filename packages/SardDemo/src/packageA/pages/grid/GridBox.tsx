import { View } from '@tarojs/components'
import { ReactNode } from 'react'
import classNames from 'classnames'

import './index.scss'

export interface GridBoxProps {
  children?: ReactNode
  higher?: boolean
}

export const GridBox = (props: GridBoxProps) => {
  const { children, higher } = props

  return (
    <View
      className={classNames('demo-grid-box', {
        'demo-grid-box-higher': higher,
      })}
    >
      {children}
    </View>
  )
}

export default GridBox
