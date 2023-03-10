import {
  Children,
  cloneElement,
  CSSProperties,
  FC,
  ReactElement,
  useMemo,
  useState,
  ReactNode,
  useRef,
} from 'react'
import classNames from 'classnames'

import { DropdownItem, DropdownItemProps } from './Item'
import { DropdownOption } from './Option'
import { pickNullish } from '../../utils'
import { useEvent } from '../../use'

export * from './Item'
export * from './Option'

export interface DropdownProps {
  className?: string
  style?: CSSProperties
  children?: ReactElement | ReactElement[]
  direction?: DropdownItemProps['direction']
  disabled?: boolean
  awayClosable?: boolean
  maskClosable?: boolean
  icon?: (visible: boolean) => ReactNode
}

export interface DropdownFC extends FC<DropdownProps> {
  Item: typeof DropdownItem
  Option: typeof DropdownOption
}

export const Dropdown: DropdownFC = (props) => {
  const {
    className,
    children,
    direction,
    disabled,
    awayClosable,
    maskClosable,
    icon,
    ...restProps
  } = props

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

  const elementsRef = useRef([])
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

  const dropdownClass = classNames(
    's-dropdown',
    {
      's-dropdown-show': show,
    },
    className,
  )

  return (
    <div {...restProps} className={dropdownClass}>
      {Children.toArray(children).map(
        (element: ReactElement<DropdownItemProps & { ref: any }>, index) => {
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
            ...pickNullish(element.props, props, [
              'direction',
              'disabled',
              'awayClosable',
              'maskClosable',
              'icon',
            ]),
          })
        },
      )}
    </div>
  )
}

Dropdown.Item = DropdownItem
Dropdown.Option = DropdownOption

export default Dropdown
