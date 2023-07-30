import { FC } from 'react'
import {
  SwiperItem as TaroSwiperItem,
  SwiperItemProps as TaroSwiperItemProps,
} from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface SwiperItemProps
  extends BaseProps,
    Omit<TaroSwiperItemProps, 'style'> {}

export type SwiperItemFC = FC<SwiperItemProps>

export const SwiperItem: SwiperItemFC = (props) => {
  const { className, children, ...restProps } = props

  const [bem] = useBem('swiper-item')

  const itemClass = classNames(bem.b(), className)

  return (
    <TaroSwiperItem {...restProps} className={itemClass}>
      {children}
    </TaroSwiperItem>
  )
}

export default SwiperItem
