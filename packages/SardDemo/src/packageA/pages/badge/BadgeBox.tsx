import { View } from '@tarojs/components'
import { ReactNode } from 'react'

import './index.scss'

export interface BadgeBoxProps {
  children?: ReactNode
}

export const BadgeBox = (props: BadgeBoxProps) => {
  const { children } = props

  return <View className="demo-badge-box">{children}</View>
}

export default BadgeBox
