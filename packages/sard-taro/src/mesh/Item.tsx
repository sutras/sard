import { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import Icon, { IconProps } from '../icon'

import { BaseProps } from '../base'
import { MeshCommonProps } from './type'
import { useBem } from '../use'

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
    text,
    iconProps,
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

  const [bem] = useBem('mesh')

  return (
    <View {...restProps} className={classNames(bem.e('item'), className)}>
      <View
        className={classNames(
          bem.e('item-content'),
          bem.em('item-content', 'square', square),
        )}
      >
        <View
          className={classNames(
            bem.e('item-wrapper'),
            bem.m('clickable', clickable),
            bem.m('border-right', border && !gap && !isRight),
            bem.m('border-bottom', border && !gap && !isBottom),
            bem.m('border-surround', border && gap),
            bem.m('center', center),
            bem.em('item-wrapper', 'square', square),
            bem.m(direction, !reverse),
            bem.m(`${direction}-reverse`, reverse),
          )}
        >
          {children ?? (
            <>
              {iconProps && (
                <View className={bem.e('item-icon')}>
                  <Icon {...iconProps}></Icon>
                </View>
              )}
              {text && (
                <View
                  className={classNames(
                    bem.e('item-text'),
                    bem.em('item-text', direction, iconProps && !reverse),
                    bem.em(
                      'item-text',
                      `${direction}-reverse`,
                      iconProps && reverse,
                    ),
                  )}
                >
                  {text}
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default MeshItem
