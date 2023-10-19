import { FC, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { isRN, systemInfo } from '../utils'

export interface SafeAreaProps extends BaseProps {
  direction?: 'top' | 'right' | 'bottom' | 'left'
}

export const SafeArea: FC<SafeAreaProps> = (props) => {
  const {
    className,
    style,

    direction = 'bottom',
  } = props

  const safeAreaMargin = useMemo(() => {
    // H5和小程序通过css环境变量设置
    if (!isRN) {
      return
    }

    const {
      safeArea: { top = 0, right = 0, bottom = 0, left = 0 } = {},
      windowWidth,
      windowHeight,
    } = systemInfo

    return {
      top,
      right: windowWidth - right,
      bottom: windowHeight - bottom,
      left,
    }
  }, [])

  const sizeStyle = useMemo(() => {
    return safeAreaMargin
      ? {
          [direction === 'top' || direction === 'bottom' ? 'height' : 'width']:
            safeAreaMargin[direction],
        }
      : null
  }, [direction])

  const [bem] = useBem('safe-area')

  return (
    <View
      className={classNames(bem.b(), bem.m(direction), className)}
      style={{
        ...style,
        ...sizeStyle,
      }}
    />
  )
}

export default SafeArea
