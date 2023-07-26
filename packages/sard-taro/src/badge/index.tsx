import { ReactNode, memo, NamedExoticComponent } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { isNumber, isVisibleEmpty } from '../utils'
import { BaseProps } from '../base'

export interface BadgeProps extends BaseProps {
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
    'sar-badge',
    {
      'sar-badge-fixed': fixed,
      'sar-badge-is-dot': isDot,
      'sar-badge-zero-hide': zeroHide,
    },
    className,
  )

  const contentClass = classNames('sar-badge-content', {
    'sar-badge-fixed': !fixed && !isVisibleEmpty(children),
  })

  const contentStyle = {
    backgroundColor: color,
    color: textColor,
  }

  return (
    <View {...restProps} className={badgeClass}>
      {children}
      <View className={contentClass} style={contentStyle}>
        {isDot ? '' : isNumber(value) && value > max ? `${max}+` : value}
      </View>
    </View>
  )
})

export default Badge
