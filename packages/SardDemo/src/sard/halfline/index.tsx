import { FC, MemoExoticComponent, memo, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { systemInfo } from '../utils'

export interface HalflineProps extends Omit<BaseProps, 'children'> {
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'around'
}

const lineWidth = 1 / systemInfo.pixelRatio

interface HalflineFC extends MemoExoticComponent<FC<HalflineProps>> {
  lineWidth: number
}

export const Halfline: HalflineFC = memo((props) => {
  const { className, style, direction = 'around' } = props

  const [bem] = useBem('halfline')

  const sizeStyle = useMemo(() => {
    if (direction === 'around') {
      return {
        borderWidth: lineWidth,
      }
    }
    return {
      [direction === 'top' || direction === 'bottom' ? 'height' : 'width']:
        lineWidth,
    }
  }, [direction])

  return (
    <View
      className={classNames(bem.b(), bem.m(direction), className)}
      style={{
        ...sizeStyle,
        ...style,
      }}
    />
  )
}) as HalflineFC

Halfline.lineWidth = lineWidth

export default Halfline
