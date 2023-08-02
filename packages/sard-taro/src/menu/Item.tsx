import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Icon, { IconProps } from '../icon'

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
    text,
    disabled,
    iconProps,
    direction,
    theme,
    index,
    count,
    ...restProps
  } = props

  const [bem] = useBem('menu')

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('item'),
        bem.em('item', direction),
        bem.em('item', `${direction}-first`, index === 0),
        bem.em('item', `${direction}-last`, index === count - 1),
        bem.em('item', `${theme}-interactive`, !disabled),
        bem.em('item', `${theme}-${direction}-later`, index > 0),
        bem.em('item', 'disabled', disabled),
        className,
      )}
      key={index}
    >
      {iconProps && <Icon {...iconProps} className={bem.e('item-icon')}></Icon>}
      <View
        className={classNames(
          bem.e('item-text'),
          bem.em('item-text', `${theme}-${direction}-later`, index > 0),
          bem.em('item-text', 'has-icon', !!iconProps),
        )}
      >
        {text}
      </View>
    </View>
  )
}

export default MenuItem
