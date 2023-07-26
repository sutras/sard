import { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import Icon, { IconProps } from '../icon'

import { BaseProps } from '../base'
import { MeshCommonProps } from './type'

export interface MeshItemProps extends BaseProps, MeshCommonProps {
  text?: ReactNode
  iconProps?: IconProps
  onClick?: (event: ITouchEvent) => void
  isRight?: boolean
  isBottom?: boolean
}

export const MeshItem: FC<MeshItemProps> = (props) => {
  const {
    children,
    className,
    style,
    text,
    iconProps,
    onClick,
    isRight,
    isBottom,

    gap = 0,
    border = true,
    square,
    center = true,
    clickable,
    direction = 'vertical',
    reverse,
    ...restProps
  } = props

  const meshItemClass = classNames('sar-mesh-item', className)

  const meshItemStyle = {
    ...style,
  }

  const contentClass = classNames('sar-mesh-item-content', {
    'sar-item-clickable': clickable,
    'sar-mesh-border-right': border && !gap && !isRight,
    'sar-mesh-border-bottom': border && !gap && !isBottom,
    'sar-mesh-border-surround': border && gap,
    'sar-mesh-center': center,
    'sar-mesh-square': square,
    [`sar-mesh-${direction}`]: !reverse,
    [`sar-mesh-${direction}-reverse`]: reverse,
  })

  return (
    <View
      {...restProps}
      className={meshItemClass}
      style={meshItemStyle}
      onClick={onClick}
    >
      <View className={contentClass}>
        {children ?? (
          <>
            {iconProps && (
              <View className="sar-item-icon">
                <Icon {...iconProps}></Icon>
              </View>
            )}
            {text && <View className="sar-item-text">{text}</View>}
          </>
        )}
      </View>
    </View>
  )
}

export default MeshItem
