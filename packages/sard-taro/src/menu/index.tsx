import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { AnyType, BaseProps } from '../base'
import { useBem } from '../use'
import { IconProps } from '../icon'
import MenuItem from './Item'

export interface MenuOption {
  text?: ReactNode
  disabled?: boolean
  iconProps?: IconProps
  [key: PropertyKey]: AnyType
}

export interface MenuProps extends Omit<BaseProps, 'children'> {
  options?: MenuOption[]
  direction?: 'vertical' | 'horizontal'
  theme?: 'dark' | 'light'
  onSelect?: (option: MenuOption) => void
}

export const Menu: FC<MenuProps> = (props) => {
  const { className, options, direction, theme, onSelect, ...restProps } = props

  const [bem] = useBem('menu')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(direction), className)}
    >
      {options.map((option, index) => {
        return (
          <MenuItem
            {...option}
            key={index}
            index={index}
            count={options.length}
            direction={direction}
            theme={theme}
            onClick={() => !option.disabled && onSelect?.(option)}
          ></MenuItem>
        )
      })}
    </View>
  )
}

export default Menu
