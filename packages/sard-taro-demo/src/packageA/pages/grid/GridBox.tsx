import { View } from '@tarojs/components'
import { ReactNode } from 'react'

export interface GridBoxProps {
  children?: ReactNode
  higher?: boolean
}

export const GridBox = (props: GridBoxProps) => {
  const { children, higher } = props

  return (
    <View
      style={{
        padding: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        backgroundColor: 'tomato',
        height: higher ? 90 : undefined,
      }}
    >
      {children}
    </View>
  )
}

export default GridBox
