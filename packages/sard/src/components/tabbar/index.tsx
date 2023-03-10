import {
  CSSProperties,
  ReactElement,
  Children,
  cloneElement,
  FC,
  MouseEvent,
} from 'react'
import classNames from 'classnames'
import { pickNullish } from '../../utils'
import { useControlledValue } from '../../use'

import { TabbarItem, TabbarItemProps } from './Item'

export * from './Item'

export interface TabbarProps {
  className?: string
  style?: CSSProperties
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

  const [innerActiveKey, setInnerActiveKey] = useControlledValue<
    number | string
  >(props, {
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
  })

  const handleItemClick = (
    key: number | string,
    element: ReactElement,
    event: MouseEvent,
  ) => {
    setInnerActiveKey(key)
    element.props?.onClick?.(event)
  }

  const tabbarClass = classNames(
    's-tabbar',
    {
      's-tabbar-fixed': fixed,
    },
    className,
  )

  const tabbarStyle = {
    zIndex: fixed ? zIndex : '',
    ...style,
  }

  return (
    <div {...restProps} className={tabbarClass} style={tabbarStyle}>
      {Children.map(
        children,
        (element: ReactElement<TabbarItemProps>, index) => {
          const innerKey = element.key ?? index

          return cloneElement(element, {
            ...pickNullish(element.props, props, ['color', 'activeColor']),
            innerKey,
            activeKey: innerActiveKey,
            onClick: (event: MouseEvent) =>
              handleItemClick(innerKey, element, event),
          })
        },
      )}
    </div>
  )
}

Tabbar.Item = TabbarItem

export default Tabbar
