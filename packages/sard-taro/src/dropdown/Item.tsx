import {
  ReactNode,
  useEffect,
  useState,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { useControllableValue, useResize, useSelectorId } from '../use'
import { Popup, PopupProps } from '../popup'
import { DropdownOption } from './Option'
import { Icon } from '../icon'

import { DropdownOptionProps } from './Option'
import { useEvent } from '../use'
import { BaseProps } from '../base'
import { getRectById, isBoolean } from '../utils'

export interface DropdownItemProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  options?: DropdownOptionProps[]
  direction?: 'down' | 'up'
  disabled?: boolean
  value?: number | string
  defaultValue?: number | string
  onChange?: (value: number | string) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  onVisibleChange?: (visible: boolean) => void
  awayClosable?: boolean
  maskClosable?: boolean
  icon?: (
    visible: boolean,
    direction: DropdownItemProps['direction'],
  ) => ReactNode
  popupProps?: PopupProps
  onClick?: (event: ITouchEvent) => void
}

const mapDirectionPlacement = {
  down: 'slide-top',
  up: 'slide-bottom',
} as const

export interface DropdownItemRef {
  toggle: (visible?: boolean) => void
}

export type DropdownItemFC = ForwardRefExoticComponent<
  PropsWithoutRef<DropdownItemProps> & RefAttributes<DropdownItemRef>
>

export const DropdownItem: DropdownItemFC = forwardRef((props, ref) => {
  const {
    className,
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

  const itemId = useSelectorId()

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const [popoverVisible, setPopoverVisible] = useState(innerVisible)
  const [actualVisible, setActualVisible] = useState(innerVisible)

  const handleOptionClick = (option: DropdownOptionProps) => {
    if (option.value !== innerValue) {
      setInnerValue(option.value)
    }

    setInnerVisible(false)
  }

  const handleItemClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
      setInnerVisible(!innerVisible)
    }
  }

  const handleMaskClick = () => {
    if (maskClosable) {
      setInnerVisible(false)
    }
  }

  const handleAwayClick = () => {
    if (awayClosable) {
      setInnerVisible(false)
    }
  }

  const [popupInset, setPopupInset] = useState('0')
  const [awayInset, setAwayInset] = useState('0')

  const setPosition = useEvent(() => {
    if (innerVisible) {
      getRectById(itemId, {
        rect: true,
      }).then((res) => {
        const info = Taro.getSystemInfoSync()
        const topInset = `0 0 ${info.windowHeight - res.top}px`
        const bottomInset = `${res.bottom}px 0 0`

        if (direction === 'down') {
          setPopupInset(bottomInset)
          setAwayInset(topInset)
        } else {
          setPopupInset(topInset)
          setAwayInset(bottomInset)
        }

        setActualVisible(true)
      })
    }
  })

  useEffect(() => {
    setPosition()

    if (!innerVisible) {
      setActualVisible(false)
    }
  }, [innerVisible, direction])

  useResize(() => {
    setPosition()
  }, 150)

  const handleEnter = () => {
    setPopoverVisible(true)
    onVisibleChange?.(true)
  }

  const handleExited = () => {
    setPopoverVisible(false)
    onVisibleChange?.(false)
  }

  const toggle = useEvent((visible: boolean) => {
    if (isBoolean(visible)) {
      setInnerVisible(visible)
    } else {
      setInnerVisible(!setInnerVisible)
    }
  })

  useImperativeHandle(ref, () => ({
    toggle,
  }))

  const itemClass = classNames(
    'sar-dropdown-item',
    {
      'sar-dropdown-item-show': actualVisible,
      'sar-dropdown-item-disabled': disabled,
    },
    `sar-dropdown-item-${direction}`,
    className,
  )

  return (
    <>
      <View
        {...restProps}
        className={itemClass}
        id={itemId}
        onClick={handleItemClick}
      >
        {label && <View className="sar-dropdown-item-label">{label}</View>}
        {title && <View className="sar-dropdown-item-title">{title}</View>}
        {innerValue && (
          <View className="sar-dropdown-item-value">
            {options.find((option) => option.value === innerValue)?.label}
          </View>
        )}

        <View className="sar-dropdown-item-icon">
          {icon ? (
            icon(actualVisible, direction)
          ) : (
            <Icon
              name={actualVisible ? 'caret-up-fill' : 'caret-down-fill'}
            ></Icon>
          )}
        </View>
      </View>

      <View
        style={{ inset: awayInset }}
        className={classNames('sar-dropdown-away', {
          'sar-dropdown-away-show': actualVisible,
        })}
        onClick={handleAwayClick}
        catchMove
      ></View>

      <View
        className={classNames('sar-dropdown-popover', {
          'sar-dropdown-popover-show': popoverVisible,
        })}
        style={{ inset: popupInset }}
      >
        <Popup
          {...popupProps}
          effect={mapDirectionPlacement[direction]}
          visible={actualVisible}
          className="sar-dropdown-popup"
          maskClass="sar-dropdown-mask"
          onEnter={handleEnter}
          onExited={handleExited}
          onMaskClick={handleMaskClick}
        >
          {/* <ScrollView
          scrollY
          enablePassive=""
          className="sar-dropdown-scrollview"
          catchtouchmove
        >
        </ScrollView> */}
          {children ?? (
            <View className="sar-dropdown-options">
              {options.map((option, index) => {
                const { value, ...restProps } = option
                return (
                  <DropdownOption
                    {...restProps}
                    key={index}
                    active={value === innerValue}
                    onClick={() => handleOptionClick(option)}
                  ></DropdownOption>
                )
              })}
            </View>
          )}
        </Popup>
      </View>
    </>
  )
})

export default DropdownItem
