import { View } from '@tarojs/components'
import { ReactNode } from 'react'
import classNames from 'classnames'
import { BaseProps } from '../base'
import './index.scss'

interface Props extends BaseProps {
  title: ReactNode
}

export default (props: Props) => {
  const { title, className, children, ...restProps } = props

  return (
    <View {...restProps} className={classNames('card', className)}>
      <View className="card-title">{title}</View>
      <View className="card-body">{children}</View>
    </View>
  )
}
