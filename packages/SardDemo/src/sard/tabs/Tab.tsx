import { ReactNode, forwardRef } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem, useEvent } from '../use'
import { isFunction } from '../utils'

export interface TabsTabProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((active: boolean) => ReactNode)
  disabled?: boolean
  _onSelect?: (key: string | number) => void
  _active?: boolean
  _scrollable?: boolean
  _key?: string | number
}

export const TabsTab = forwardRef<any, TabsTabProps>((props, ref) => {
  const {
    className,
    style,
    children,

    disabled,
    _onSelect,
    _active = false,
    _scrollable,
    _key,
    ...restProps
  } = props

  const [bem] = useBem('tabs')

  const handleClick = useEvent(() => {
    if (!disabled && !_active) {
      _onSelect?.(_key as string | number)
    }
  })

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('tab'),
        bem.em('tab', 'active', _active),
        bem.em('tab', 'scrollable', _scrollable),
        bem.em('tab', 'disabled', disabled),
        className,
      )}
      style={style}
      onClick={handleClick}
      ref={ref}
    >
      {isFunction(children) ? children(_active) : children}
    </View>
  )
})

export default TabsTab
