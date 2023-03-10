import { CSSProperties, ReactNode, memo, NamedExoticComponent } from 'react'
import classNames from 'classnames'
import { isVisibleEmpty } from '../../utils'

export interface BadgeProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: number | ReactNode
  max?: number
  showZero?: boolean
  color?: string
  textColor?: string
  isDot?: boolean
  fixed?: boolean
}

export const Badge: NamedExoticComponent<BadgeProps> = memo((props) => {
  const {
    className,
    children,
    value = 0,
    max = 99,
    showZero = false,
    color,
    textColor,
    isDot,
    fixed,
    ...restProps
  } = props

  const zeroHide = !isDot && value === 0 && !showZero

  const badgeClass = classNames(
    's-badge',
    {
      's-badge-fixed': fixed,
      's-badge-is-dot': isDot,
      's-badge-zero-hide': zeroHide,
    },
    className,
  )

  const contentClass = classNames('s-badge-content', {
    's-badge-fixed': !fixed && !isVisibleEmpty(children),
  })

  const contentStyle = {
    backgroundColor: color,
    color: textColor,
  }

  return (
    <div {...restProps} className={badgeClass}>
      {children}
      <div className={contentClass} style={contentStyle}>
        {isDot
          ? ''
          : typeof value === 'number' && value > max
          ? `${max}+`
          : value}
      </div>
    </div>
  )
})

export default Badge
