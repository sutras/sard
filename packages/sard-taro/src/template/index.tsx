import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

export type TemplateProps = BaseProps

export const Template: FC<TemplateProps> = (props) => {
  const { className, children, ...restProps } = props

  const [bem] = useBem('template')

  return (
    <View {...restProps} className={classNames(bem.b(), className)}>
      {children}
    </View>
  )
}

export default Template
