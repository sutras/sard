import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Icon, { IconProps } from '../icon'
import Halfline from '../halfline'
import Pressable from '../pressable'

export interface MenuItemProps extends BaseProps {
  text?: ReactNode
  disabled?: boolean
  iconProps?: IconProps
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  index?: number
  count?: number
  onClick?: () => void
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const {
    className,
    style,

    text,
    disabled,
    iconProps,
    direction,
    theme,
    onClick,

    index,
    count,
    ...restProps
  } = props

  const [bem] = useBem('menu')

  return (
    <Pressable disabled={disabled}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.em('item', direction),
            bem.em('item', `${direction}-first`, index === 0),
            bem.em(
              'item',
              `${direction}-last`,
              index === (count as number) - 1,
            ),
            bem.em('item', `${theme}-active`, pressed),
            bem.em(
              'item',
              `${theme}-${direction}-later`,
              (index as number) > 0,
            ),
            bem.em('item', 'disabled', disabled),
            className,
          )}
          style={style}
          key={index}
          onClick={onClick}
        >
          {(index as number) > 0 && direction === 'horizontal' && (
            <Halfline direction="left" className={bem.em('divider', theme)} />
          )}
          {iconProps && (
            <Icon
              {...iconProps}
              className={classNames(
                bem.e('icon'),
                bem.em('icon', direction),
                bem.em('icon', theme),
              )}
            />
          )}
          <View
            className={classNames(
              bem.e('text'),
              bem.em(
                'text',
                `${theme}-${direction}-later`,
                (index as number) > 0,
              ),
              bem.em('text', theme),
              bem.em('text', 'has-icon', !!iconProps),
            )}
          >
            {(index as number) > 0 && direction === 'vertical' && (
              <Halfline direction="top" className={bem.em('divider', theme)} />
            )}
            {text}
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default MenuItem
