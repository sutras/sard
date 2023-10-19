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
  const { className, style, children, ...restProps } = props

  const [bem] = useBem('swiper')

  return (
    <TaroSwiperItem
      {...restProps}
      className={classNames(bem.e('item'), className)}
      style={style}
    >
      {children}
    </TaroSwiperItem>
  )
}

export default SwiperItem
