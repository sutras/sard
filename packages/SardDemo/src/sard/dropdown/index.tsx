import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useMemo,
  useState,
  ReactNode,
  useRef,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import { DropdownItem, DropdownItemProps, DropdownItemRef } from './Item'
import { DropdownOption } from './Option'
import { pickNonNullish } from '../utils'
import { useBem, useEvent } from '../use'
import { BaseProps } from '../base'

export * from './Item'
export * from './Option'

export interface DropdownProps extends Omit<BaseProps, 'children'> {
  children?: ReactElement | ReactElement[]
  direction?: DropdownItemProps['direction']
  disabled?: boolean
  awayClosable?: boolean
  maskClosable?: boolean
  arrow?: (visible: boolean) => ReactNode
}

export interface DropdownFC extends FC<DropdownProps> {
  Item: typeof DropdownItem
  Option: typeof DropdownOption
}

export const Dropdown: DropdownFC = (props) => {
  const {
    className,
    style,
    children,
    direction,
    disabled,
    awayClosable,
    maskClosable,
    arrow,
    ...restProps
  } = props

  const [bem] = useBem('dropdown')

  const [visibleList, setVisibleList] = useState<boolean[]>([])

  const show = useMemo(() => {
    return visibleList.some((item) => item)
  }, [visibleList])

  const handleVisible = (visible: boolean, index: number) => {
    setVisibleList((visibleList) => {
      visibleList[index] = visible
      return [...visibleList]
    })
  }

  const elementsRef = useRef<DropdownItemRef[]>([])
  const collectElements = useEvent((element, index: number) => {
    elementsRef.current[index] = element
  })

  const toggleItem = (activeIndex: number) => {
    elementsRef.current.forEach((item, index) => {
      if (activeIndex !== index) {
        item.toggle(false)
      }
    })
  }

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m('show', show), className)}
      style={style}
    >
      {/* <View
        className={classNames(bem.e('shadow'), bem.em('shadow', 'show', show))}
        style={{
          ...(getShadow() as any),
          backgroundColor: 'white',
        }}
      /> */}
      {Children.toArray(children).map(
        (
          element: ReactElement<DropdownItemProps & { ref: (el) => void }>,
          index,
        ) => {
          return cloneElement(element, {
            ref: (el) => collectElements(el, index),
            onVisibleChange(visible: boolean) {
              handleVisible(visible, index)
              element.props.onVisibleChange?.(visible)
            },
            onClick(event) {
              toggleItem(index)
              element.props.onClick?.(event)
            },
            _itemShow: show,
            ...pickNonNullish(
              {
                direction,
                disabled,
                awayClosable,
                maskClosable,
                arrow,
              },
              element.props,
            ),
          })
        },
      )}
    </View>
  )
}

Dropdown.Item = DropdownItem
Dropdown.Option = DropdownOption

export default Dropdown
