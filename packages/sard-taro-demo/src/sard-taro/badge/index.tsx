import { ReactNode, memo, NamedExoticComponent } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { filterNullish, isNullish, isNumber } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface BadgeProps extends BaseProps {
  value?: ReactNode
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
    style,
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

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m('fixed', fixed), className)}
      style={style}
    >
      {children}
      <View
        className={classNames(
          bem.e('content-wrapper'),
          bem.m('fixed', !fixed && !isNullish(children)),
          bem.m('zero-hide', zeroHide),
        )}
      >
        <View
          className={classNames(
            bem.e('content'),
            bem.em('content', 'fixed', fixed || !isNullish(children)),
            bem.m('is-dot', isDot),
          )}
          style={filterNullish({
            backgroundColor: color,
            color: textColor,
          })}
        >
          {isDot ? '' : isNumber(value) && value > max ? `${max}+` : value}
        </View>
      </View>
    </View>
  )
})

export default Badge
