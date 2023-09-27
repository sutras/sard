import { FC } from 'react'
import classNames from 'classnames'
import { ITouchEvent, Text, View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem } from '../use'
import Pressable from '../pressable'

export interface NavbarItemProps extends BaseProps {
  onClick?: (event: ITouchEvent) => void
}

export const NavbarItem: FC<NavbarItemProps> = (props) => {
  const { className, style, children, onClick, ...restProps } = props

  const [bem] = useBem('navbar')

  return (
    <Pressable>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.em('item', 'pressed', pressed),
            className,
          )}
          style={style}
          onClick={onClick}
        >
          <Text className={bem.e('item-text')}>{children}</Text>
        </View>
      )}
    </Pressable>
  )
}

export default NavbarItem
