import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { Icon } from 'sard-taro'

import IconShowcaseGroup from './Group'

import './index.scss'

interface Props extends Omit<BaseProps, 'children'> {
  name: string
}

export const IconShowcase = (props: Props) => {
  const { name, className, ...restProps } = props

  return (
    <View {...restProps} className={classNames('icon-showcase', className)}>
      <View className="icon-showcase-icon">
        <Icon name={name}></Icon>
      </View>
      <View className="icon-showcase-name">{name}</View>
    </View>
  )
}

IconShowcase.Group = IconShowcaseGroup

export default IconShowcase
