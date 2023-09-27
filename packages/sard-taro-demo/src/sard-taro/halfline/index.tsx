import { memo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface HalflineProps extends Omit<BaseProps, 'children'> {
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'around'
}

export const Halfline = memo((props: HalflineProps) => {
  const { className, style, direction = 'around', ...restProps } = props

  const [bem] = useBem('halfline')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(direction), className)}
      style={style}
    />
  )
})

export default Halfline
