import { ReactNode, memo, NamedExoticComponent } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { isNumber, isVisibleEmpty } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'

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

  const [bem] = useBem('badge')

  const zeroHide = !isDot && value === 0 && !showZero

  const badgeClass = classNames(bem.b(), bem.m('fixed', fixed), className)

  const contentClass = classNames(
    bem.e('content'),
    bem.m('fixed', !fixed && !isVisibleEmpty(children)),
    bem.m('zero-hide', zeroHide),
    bem.m('is-dot', isDot),
  )

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
