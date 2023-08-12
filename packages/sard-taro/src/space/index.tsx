import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { isNumber, isString } from '../utils'

export interface SpaceProps extends BaseProps {
  align?: 'start' | 'center' | 'end'
  vertical?: boolean
  gap?: 'small' | 'medium' | 'large' | number
  wrap?: boolean
}

export const Space: FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    children,
    align,
    vertical = false,
    gap = 'small',
    wrap = true,
    ...restProps
  } = props

  const [bem] = useBem('space')

  return (
    <View
      {...restProps}
      style={{ ...style, gap: isNumber(gap) ? gap : '' }}
      className={classNames(
        bem.b(),
        bem.m(align, align),
        bem.m('vertical', vertical),
        bem.m(gap, isString(gap)),
        bem.m('wrap', wrap),
        className,
      )}
    >
      {children}
    </View>
  )
}

export default Space
