import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { IconProps } from '../icon'
import MenuItem from './Item'

export interface MenuOption {
  text?: ReactNode
  disabled?: boolean
  iconProps?: IconProps
  [key: PropertyKey]: any
}

export interface MenuProps extends Omit<BaseProps, 'children'> {
  options?: MenuOption[]
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  onSelect?: (option: MenuOption) => void
}

const defaultOptions = []

export const Menu: FC<MenuProps> = (props) => {
  const {
    className,
    style,

    options = defaultOptions,
    direction,
    theme,
    onSelect,
    ...restProps
  } = props

  const [bem] = useBem('menu')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(direction), className)}
      style={style}
    >
      {options.map((option, index) => {
        return (
          <MenuItem
            {...option}
            key={index}
            index={index}
            direction={direction}
            count={options.length}
            theme={theme}
            onClick={() => !option.disabled && onSelect?.(option)}
          />
        )
      })}
    </View>
  )
}

export default Menu
