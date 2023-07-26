import { FC } from 'react'
import {
  SwiperItem as TaroSwiperItem,
  SwiperItemProps as TaroSwiperItemProps,
  View,
} from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'

export interface SwiperItemProps
  extends BaseProps,
    Omit<TaroSwiperItemProps, 'style'> {}

export type SwiperItemFC = FC<SwiperItemProps>

export const SwiperItem: SwiperItemFC = (props) => {
  const { className, children, ...restProps } = props

  const itemClass = classNames('sar-swiper-item', className)

  return (
    <TaroSwiperItem {...restProps} className={itemClass}>
      <View className="sar-swiper-item-wrapper">{children}</View>
    </TaroSwiperItem>
  )
}

export default SwiperItem
