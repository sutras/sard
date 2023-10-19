import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TemplateProps extends BaseProps {}

export const Template: FC<TemplateProps> = (props) => {
  const { className, style, children, ...restProps } = props

  const [bem] = useBem('template')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      {children}
    </View>
  )
}

export default Template
