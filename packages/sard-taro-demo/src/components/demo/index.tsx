import { View } from '@tarojs/components'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { BaseProps } from '../base'
import './index.scss'

interface Props extends BaseProps {
  title: ReactNode
  full?: boolean
}

export default (props: Props) => {
  const { title, full, className, children, ...restProps } = props

  return (
    <View
      {...restProps}
      className={classNames(
        'demo',
        {
          'demo-full': full,
        },
        className,
      )}
    >
      <View className="demo-title">{title}</View>
      <View className="demo-body">{children}</View>
    </View>
  )
}
