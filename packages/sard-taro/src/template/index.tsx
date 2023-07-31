import { FC } from 'react'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'

export type TemplateProps = BaseProps

export const Template: FC<TemplateProps> = (props) => {
  const { ...restProps } = props

  return <View {...restProps}></View>
}

export default Template
