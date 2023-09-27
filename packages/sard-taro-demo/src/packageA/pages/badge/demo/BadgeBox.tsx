import { View } from '@tarojs/components'
import { ReactNode } from 'react'

export interface BadgeBoxProps {
  children?: ReactNode
}

export const BadgeBox = (props: BadgeBoxProps) => {
  const { children } = props

  return (
    <View
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 6,
        backgroundColor: '#e3e3e3',
      }}
    >
      {children}
    </View>
  )
}

export default BadgeBox
