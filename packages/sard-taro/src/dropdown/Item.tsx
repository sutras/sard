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
import { useBem, useControllableValue, useResize, useSelectorId } from '../use'
import { Popup, PopupProps } from '../popup'
import { DropdownOption } from './Option'
import { Icon } from '../icon'

import { DropdownOptionProps } from './Option'
import { useEvent } from '../use'
import { BaseProps } from '../base'
import { getRectById, isBoolean, isNullish } from '../utils'
import Cell from '../cell'

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
  itemShow?: boolean
  awayClosable?: boolean
  maskClosable?: boolean
  arrow?: (
    visible: boolean,
    direction: DropdownItemProps['direction'],
  ) => ReactNode
  popupProps?: PopupProps
  onClick?: (event: ITouchEvent) => void
  separator?: string
  placeholder?: ReactNode
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
    itemShow,
    awayClosable = true,
    maskClosable = true,
    arrow,
    popupProps,
    onClick,
    separator,
    placeholder,
    ...restProps
  } = props

  const [bem] = useBem('dropdown')

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
      getRectById(itemId).then((res) => {
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

  const renderLabel = () => {
    return (
      !isNullish(label) && (
        <View
          className={classNames(
            bem.e('label'),
            bem.em('label', 'disabled', disabled),
          )}
        >
          {label}
          {!isNullish(title) || !isNullish(innerValue) ? separator : null}
        </View>
      )
    )
  }

  const renderTitle = () => {
    return (
      !isNullish(title) && (
        <View
          className={classNames(
            bem.e('title'),
            bem.em('title', 'disabled', disabled),
            bem.em('title', 'has-label', !!label),
          )}
        >
          {title}
        </View>
      )
    )
  }

  const renderPlaceholder = () => {
    return (
      !isNullish(placeholder) && (
        <View
          className={classNames(
            bem.e('placeholder'),
            bem.em('placeholder', 'has-label', !!label),
          )}
        >
          {placeholder}
        </View>
      )
    )
  }

  const renderValue = () => {
    return !isNullish(innerValue) ? (
      <View
        className={classNames(
          bem.e('value'),
          bem.em('value', 'disabled', disabled),
          bem.em('title', 'has-label', !!label),
        )}
      >
        {options.find((option) => option.value === innerValue)?.label}
      </View>
    ) : (
      renderPlaceholder()
    )
  }

  const renderArrow = () => {
    return (
      <View
        className={classNames(
          bem.e('arrow'),
          bem.em('arrow', direction),
          bem.em('arrow', 'show', actualVisible),
        )}
      >
        {arrow ? (
          arrow(actualVisible, direction)
        ) : (
          <Icon name={actualVisible ? 'caret-up' : 'caret-down'}></Icon>
        )}
      </View>
    )
  }

  const renderAway = () => {
    return (
      <View
        style={{ inset: awayInset }}
        className={classNames(
          bem.e('away'),
          bem.em('away', 'show', actualVisible),
        )}
        onClick={handleAwayClick}
        catchMove
      ></View>
    )
  }

  return (
    <>
      <View
        {...restProps}
        className={classNames(
          bem.e('item'),
          bem.em('item', 'show', actualVisible),
          bem.em('item', 'some-show', itemShow),
          bem.em('item', 'disabled', disabled),
          bem.em('item', 'interactive', !disabled),
          className,
        )}
        id={itemId}
        onClick={handleItemClick}
      >
        {renderLabel()}
        {renderTitle()}
        {renderValue()}
        {renderArrow()}
      </View>
      {renderAway()}

      <View
        className={classNames(
          bem.e('popover'),
          bem.em('popover', 'show', popoverVisible),
        )}
        style={{ inset: popupInset }}
      >
        <Popup
          {...popupProps}
          effect={mapDirectionPlacement[direction]}
          visible={actualVisible}
          className={bem.e('popup')}
          maskClass={bem.e('mask')}
          onEnter={handleEnter}
          onExited={handleExited}
          onMaskClick={handleMaskClick}
          catchMove
        >
          {children ?? (
            <Cell.Group className={bem.e('options')} inlaid>
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
            </Cell.Group>
          )}
        </Popup>
      </View>
    </>
  )
})

export default DropdownItem
