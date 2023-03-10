import {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { useControlledValue, useResize } from '../../use'
import { Popup, PopupProps } from '../popup'
import { DropdownOption } from './Option'
import { Icon } from '../icon'

import { DropdownOptionProps } from './Option'
import { useEvent } from '../../use'

export interface DropdownItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  options?: DropdownOptionProps[]
  direction?: 'down' | 'up'
  disabled?: boolean
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  onVisibleChange?: (visible: boolean) => void
  awayClosable?: boolean
  maskClosable?: boolean
  icon?: (visible: boolean) => ReactNode
  popupProps?: PopupProps
  onClick?: (event: MouseEvent) => void
}

const mapDirectionPlacement = {
  down: 'top',
  up: 'bottom',
} as const

export interface DropdownItemRef {
  toggle: (visible?: boolean) => void
}

export interface DropdownItemFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<DropdownItemProps> & RefAttributes<DropdownItemRef>
  > {}

export const DropdownItem: DropdownItemFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    title,
    label,
    options = [],
    direction = 'down',
    disabled,
    value,
    defaultValue,
    onChange,
    visible,
    defaultVisible,
    onVisible,
    onVisibleChange,
    awayClosable = true,
    maskClosable = true,
    icon,
    popupProps,
    onClick,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<any>(props, {
    defaultValue: null,
  })

  const [innerVisible, setInnerVisible] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultVisible',
    valuePropName: 'visible',
    trigger: 'onVisible',
    defaultValue: false,
  })

  const popupRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (option: DropdownOptionProps) => {
    if (option.value !== innerValue) {
      setInnerValue(option.value)
    }

    setInnerVisible(false)
  }

  const handleItemClick = (event: MouseEvent) => {
    if (!disabled) {
      onClick?.(event)
      setInnerVisible(!innerVisible)
    }
  }

  const handleMaskClick = (event: MouseEvent) => {
    event.stopPropagation()

    if (maskClosable) {
      setInnerVisible(false)
    }
  }

  const handleDocumentClick = useEvent((event: MouseEvent) => {
    if (
      innerVisible &&
      !popupRef.current?.contains(event.target as Node) &&
      !itemRef.current?.contains(event.target as Node)
    ) {
      if (awayClosable) {
        setInnerVisible(false)
      }
    }
  })

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick, false)

    return () => {
      document.removeEventListener('click', handleDocumentClick, false)
    }
  }, [])

  const [inset, setInset] = useState('0')

  const setPosition = useEvent(() => {
    if (innerVisible && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      if (direction === 'down') {
        setInset(`${rect.bottom}px 0 0`)
      } else {
        setInset(`0 0 ${window.innerHeight - rect.top}px`)
      }
    }
  })

  useEffect(() => {
    setPosition()
  }, [innerVisible, direction])

  useResize(() => {
    setPosition()
  }, 150)

  const handleEnter = () => {
    onVisibleChange?.(true)
  }

  const handleExited = () => {
    onVisibleChange?.(false)
  }

  const toggle = useEvent((visible: boolean) => {
    if (typeof visible === 'boolean') {
      setInnerVisible(visible)
    } else {
      setInnerVisible(!setInnerVisible)
    }
  })

  useImperativeHandle(ref, () => ({
    toggle,
  }))

  const itemClass = classNames(
    's-dropdown-item',
    {
      's-dropdown-item-show': innerVisible,
      's-dropdown-item-disabled': disabled,
    },
    className,
  )

  return (
    <>
      <div
        {...restProps}
        className={itemClass}
        ref={itemRef}
        onClick={handleItemClick}
      >
        {label && <div className="s-dropdown-item-label">{label}</div>}
        {title && <div className="s-dropdown-item-title">{title}</div>}
        {innerValue && (
          <div className="s-dropdown-item-value">
            {options.find((option) => option.value === innerValue)?.label}
          </div>
        )}

        <div className="s-dropdown-item-icon">
          {icon ? (
            icon(innerVisible)
          ) : (
            <Icon
              prefix="si"
              name={innerVisible ? 'caret-up-fill' : 'caret-down-fill'}
            ></Icon>
          )}
        </div>
      </div>

      <Popup
        {...popupProps}
        placement={mapDirectionPlacement[direction]}
        visible={innerVisible}
        className="s-dropdown-popup"
        contentClass="s-dropdown-popup-content"
        style={{ inset }}
        onEnter={handleEnter}
        onExited={handleExited}
        onMaskClick={handleMaskClick}
      >
        <div ref={popupRef}>
          {children || (
            <div className="s-dropdown-options">
              {options.map((option, index) => (
                <DropdownOption
                  {...option}
                  key={index}
                  active={option.value === innerValue}
                  onClick={() => handleOptionClick(option)}
                ></DropdownOption>
              ))}
            </div>
          )}
        </div>
      </Popup>
    </>
  )
})

export default DropdownItem
