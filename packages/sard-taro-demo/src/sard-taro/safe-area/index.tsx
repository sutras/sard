import { FC, useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Taro from '@tarojs/taro'
import { isRN } from '../utils'

export interface SafeAreaProps extends BaseProps {
  direction?: 'top' | 'right' | 'bottom' | 'left'
}

export const SafeArea: FC<SafeAreaProps> = (props) => {
  const {
    className,
    style,
    children,

    direction = 'bottom',
    ...restProps
  } = props

  const [safeAreaMargin, setSafeAreaMargin] = useState<{
    top: number
    right: number
    bottom: number
    left: number
  }>()

  useEffect(() => {
    // H5和小程序通过css环境变量设置
    if (!isRN) {
      return
    }
    Taro.getSystemInfo().then((res) => {
      const {
        safeArea: { top = 0, right = 0, bottom = 0, left = 0 } = {},
        windowWidth,
        windowHeight,
      } = res

      // 全屏
      setSafeAreaMargin({
        top: top,
        right: windowWidth - right,
        bottom: windowHeight - bottom,
        left: left,
      })
    })
  }, [])

  const [bem] = useBem('safe-area')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(direction), className)}
      style={{
        ...style,
        ...(safeAreaMargin
          ? {
              [direction === 'top' || direction === 'bottom'
                ? 'height'
                : 'width']: safeAreaMargin[direction],
            }
          : null),
      }}
    >
      {children}
    </View>
  )
}

export default SafeArea
