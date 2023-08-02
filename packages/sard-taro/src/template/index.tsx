import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { useBem } from '../use'
import { BaseProps } from '../base'

export type TemplateProps = BaseProps

export const Template: FC<TemplateProps> = (props) => {
  const { className, children, ...restProps } = props

  const [bem] = useBem('Template')

  return (
    <View {...restProps} className={classNames(bem.b(), className)}>
      {children}
    </View>
  )
}

export default Template
