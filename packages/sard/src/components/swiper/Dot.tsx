import { CSSProperties, FC } from 'react'
import classNames from 'classnames'

export interface SwiperDotProps {
  className?: string
  style?: CSSProperties
  size?: number
  activeIndex?: number
  color?: string
  activeColor?: string
  clickable?: boolean
  onClick?: (index: number) => void
}

export const SwiperDot: FC<SwiperDotProps> = (props) => {
  const {
    className,
    style,
    size = 0,
    activeIndex = 0,
    color,
    activeColor,
    clickable = false,
    onClick,
    ...restProps
  } = props

  const dotsClass = classNames(
    's-swiper-dots',
    {
      's-swiper-dot-clickable': clickable,
    },
    className,
  )

  return (
    <div {...restProps} className={dotsClass}>
      {Array(size)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={classNames('s-swiper-dot', {
              's-swiper-dot-active': i === activeIndex,
            })}
            style={{
              backgroundColor: i === activeIndex ? activeColor : color,
            }}
            onClick={() => onClick?.(i)}
          ></div>
        ))}
    </div>
  )
}

export default SwiperDot
