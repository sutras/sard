import { CSSProperties, FC, ReactNode } from 'react'
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
  wrapperStyle?: CSSProperties
  wrapperClass?: string
}

export const MeshItem: FC<MeshItemProps> = (props) => {
  const {
    children,
    className,
    wrapperStyle,
    wrapperClass,
    text,
    iconProps,
    isRight,
    isBottom,

    gap = 0,
    border,
    square,
    center,
    clickable,
    direction = 'vertical',
    reverse,
    ...restProps
  } = props

  const [bem] = useBem('mesh')

  const renderContent = () => {
    return (
      <View
        className={classNames(
          bem.e('item-content'),
          bem.m('clickable', clickable),
          bem.m('border-right', border && !gap && !isRight),
          bem.m('border-bottom', border && !gap && !isBottom),
          bem.m('border-surround', border && gap),
          bem.m('center', center),
          bem.em('item-content', 'square', square),
          bem.m(direction, !reverse),
          bem.m(`${direction}-reverse`, reverse),
          wrapperClass,
        )}
        style={wrapperStyle}
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
    )
  }

  return (
    <View {...restProps} className={classNames(bem.e('item'), className)}>
      {square ? (
        <View className={classNames(bem.e('item-wrapper'))}>
          {renderContent()}
        </View>
      ) : (
        renderContent()
      )}
    </View>
  )
}

export default MeshItem
