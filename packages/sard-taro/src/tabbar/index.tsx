import { ReactElement, Children, cloneElement, FC } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { pickNullish } from '../utils'
import { useBem, useControllableValue } from '../use'

import { TabbarItem, TabbarItemProps } from './Item'
import { BaseProps } from '../base'

export * from './Item'

export interface TabbarProps extends Omit<BaseProps, 'children'> {
  children?: ReactElement | ReactElement[]
  activeKey?: number | string
  defaultActiveKey?: number | string
  color?: string
  activeColor?: string
  fixed?: boolean
  zIndex?: number | string
  onChange?: (key: number | string) => void
}

export interface TabbarFC extends FC<TabbarProps> {
  Item: typeof TabbarItem
}

export const Tabbar: TabbarFC = (props) => {
  const {
    className,
    style,
    children,
    activeKey,
    defaultActiveKey,
    color,
    activeColor,
    fixed = true,
    zIndex,
    onChange,
    ...restProps
  } = props

  const [bem] = useBem('tabbar')

  const [innerActiveKey, setInnerActiveKey] = useControllableValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
  })

  const handleItemClick = (
    key: number | string,
    element: ReactElement,
    event: ITouchEvent,
  ) => {
    setInnerActiveKey(key)
    element.props?.onClick?.(event)
  }

  const tabbarClass = classNames(bem.b(), bem.m('fixed', fixed), className)

  const tabbarStyle = {
    zIndex: fixed ? zIndex : '',
    ...style,
  }

  return (
    <View {...restProps} className={tabbarClass} style={tabbarStyle}>
      {Children.map(
        children,
        (element: ReactElement<TabbarItemProps>, index) => {
          const innerKey = element.key ?? index

          return cloneElement(element, {
            ...pickNullish({ color, activeColor }, element.props),
            innerKey,
            activeKey: innerActiveKey,
            onClick: (event) => handleItemClick(innerKey, element, event),
          })
        },
      )}
    </View>
  )
}

Tabbar.Item = TabbarItem

export default Tabbar
