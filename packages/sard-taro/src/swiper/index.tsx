import { FC } from 'react'
import {
  Swiper as TaroSwiper,
  SwiperProps as TaroSwiperProps,
} from '@tarojs/components'
import classNames from 'classnames'

import { SwiperItem } from './Item'
import { BaseProps } from '../base'
import { useBem } from '../use'

export * from './Item'

export interface SwiperProps
  extends BaseProps,
    Omit<TaroSwiperProps, 'style'> {}

export interface SwiperFC extends FC<SwiperProps> {
  Item: typeof SwiperItem
}

export const Swiper: SwiperFC = (props) => {
  const { className, children, ...restProps } = props

  const [bem] = useBem('swiper')

  const swiperClass = classNames(bem.b(), className)

  return (
    <TaroSwiper {...restProps} className={swiperClass}>
      {children}
    </TaroSwiper>
  )
}

Swiper.Item = SwiperItem

export default Swiper
