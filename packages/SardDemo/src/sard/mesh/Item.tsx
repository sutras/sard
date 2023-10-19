import { CSSProperties, FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import Icon, { IconProps } from '../icon'

import { BaseProps } from '../base'
import { MeshCommonProps } from './type'
import { useBem } from '../use'
import Halfline from '../halfline'
import Pressable from '../pressable'

export interface MeshItemProps extends BaseProps, MeshCommonProps {
  text?: ReactNode
  iconProps?: IconProps
  onClick?: (event: ITouchEvent) => void
  wrapperStyle?: CSSProperties
  wrapperClass?: string
  _isBottom?: boolean
  _isRight?: boolean
}

export const MeshItem: FC<MeshItemProps> = (props) => {
  const {
    children,
    className,
    style,

    text,
    iconProps,
    onClick,
    wrapperStyle,
    wrapperClass,
    _isRight,
    _isBottom,

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
                <Icon size={24} {...iconProps} />
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
    <Pressable disabled={!clickable}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.m('pressed', pressed),
            bem.m('clickable', clickable),
            className,
          )}
          style={style}
          onClick={onClick}
        >
          {square ? (
            <View className={classNames(bem.e('item-wrapper'))}>
              {renderContent()}
            </View>
          ) : (
            renderContent()
          )}

          {border && !gap && !_isRight && <Halfline direction="right" />}
          {border && !gap && !_isBottom && <Halfline direction="bottom" />}
          {border && !!gap && <Halfline />}
        </View>
      )}
    </Pressable>
  )
}

export default MeshItem
