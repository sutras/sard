import {
  CSSProperties,
  forwardRef,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  PropsWithoutRef,
  MouseEvent,
  HTMLAttributes,
} from 'react'
import classNames from 'classnames'

export interface SwiperItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  onClick?: (event: MouseEvent) => void
}

export type SwiperItem = ForwardRefExoticComponent<
  SwiperItemProps & RefAttributes<HTMLDivElement>
>

export type SwiperItemFC = ForwardRefExoticComponent<
  PropsWithoutRef<SwiperItemProps> & RefAttributes<HTMLDivElement>
>

export const SwiperItem: SwiperItemFC = forwardRef((props, ref) => {
  const { className, children, ...restProps } = props

  const swiperItemClass = classNames('s-swiper-item', className)

  return (
    <div {...restProps} className={swiperItemClass} ref={ref}>
      {children}
    </div>
  )
})

export default SwiperItem
