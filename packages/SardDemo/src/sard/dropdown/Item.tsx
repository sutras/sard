import {
  ReactNode,
  useEffect,
  useState,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useImperativeHandle,
  useRef,
} from 'react'
import classNames from 'classnames'
import { getSystemInfoSync } from '@tarojs/taro'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem, useControllableValue, useResize } from '../use'
import { Popup, PopupProps } from '../popup'
import { DropdownOption } from './Option'
import { Icon } from '../icon'

import { DropdownOptionProps } from './Option'
import { useEvent } from '../use'
import { BaseProps } from '../base'
import { getRectByElement, isBoolean, isNullish } from '../utils'
import List from '../list'
import Pressable from '../pressable'
import Ellipsis from '../ellipsis'
import Modal from '../modal'
import Halfline from '../halfline'

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
  arrow?: (
    visible: boolean,
    direction: DropdownItemProps['direction'],
  ) => ReactNode
  onClick?: (event: ITouchEvent) => void
  popupProps?: PopupProps
  separator?: string
  placeholder?: ReactNode

  _itemShow?: boolean
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

export const DropdownItem: DropdownItemFC = forwardRef<
  DropdownItemRef,
  DropdownItemProps
>((props, ref) => {
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
    arrow,
    onClick,
    popupProps,
    separator,
    placeholder,

    _itemShow,
    ...restProps
  } = props

  const [bem] = useBem('dropdown')

  const itemRef = useRef(null)

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
  const [realVisible, setRealVisible] = useState(innerVisible)

  const handleOptionClick = useEvent((option: DropdownOptionProps) => {
    if (!isNullish(option.value) && option.value !== innerValue) {
      setInnerValue(option.value)
    }

    setInnerVisible(false)
  })

  const handleItemClick = useEvent((event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
      setInnerVisible(!innerVisible)
    }
  })

  const handleRequestClose = useEvent(() => {
    setInnerVisible(false)
  })

  const handleMaskClick = useEvent(() => {
    if (maskClosable) {
      setInnerVisible(false)
    }
  })

  const handleAwayClick = useEvent(() => {
    if (awayClosable) {
      setInnerVisible(false)
    }
  })

  const [popupInset, setPopupInset] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })
  const [awayInset, setAwayInset] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  const setPosition = useEvent(() => {
    if (innerVisible) {
      getRectByElement(itemRef.current).then((res) => {
        const info = getSystemInfoSync()

        const popupInset = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }

        const awayInset = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }

        if (direction === 'down') {
          popupInset.top = res.bottom
          popupInset.bottom = 0

          awayInset.top = 0
          awayInset.bottom = info.windowHeight - res.bottom
        } else {
          popupInset.top = 0
          popupInset.bottom = info.windowHeight - res.top

          awayInset.top = res.top
          awayInset.bottom = 0
        }

        setPopupInset(popupInset)
        setAwayInset(awayInset)

        setRealVisible(true)
      })
    }
  })

  useEffect(() => {
    setPosition()

    if (!innerVisible) {
      setRealVisible(false)
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

  useImperativeHandle(
    ref,
    () => ({
      toggle,
    }),
    [],
  )

  const renderLabel = () => {
    return (
      !isNullish(label) && (
        <Ellipsis
          className={classNames(
            bem.e('label'),
            bem.em('label', 'disabled', disabled),
          )}
        >
          {label}
          {!isNullish(title) || !isNullish(innerValue) ? separator : null}
        </Ellipsis>
      )
    )
  }

  const renderTitle = () => {
    return (
      !isNullish(title) && (
        <Ellipsis
          className={classNames(
            bem.e('title'),
            bem.em('title', 'disabled', disabled),
            bem.em('title', 'has-label', !!label),
          )}
        >
          {title}
        </Ellipsis>
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
      <Ellipsis
        className={classNames(
          bem.e('value'),
          bem.em('value', 'disabled', disabled),
          bem.em('value', 'has-label', !!label),
        )}
      >
        {options.find((option) => option.value === innerValue)?.label}
      </Ellipsis>
    ) : (
      renderPlaceholder()
    )
  }

  const renderArrow = () => {
    return (
      <View className={classNames(bem.e('arrow'), bem.em('arrow', direction))}>
        {arrow ? (
          arrow(realVisible, direction)
        ) : (
          <Icon
            name={realVisible ? 'caret-up' : 'caret-down'}
            className={classNames(
              bem.e('arrow-icon'),
              bem.em('arrow-icon', 'show', realVisible),
            )}
          />
        )}
      </View>
    )
  }

  const renderAway = () => {
    return (
      <View
        style={awayInset}
        className={classNames(
          bem.e('away'),
          bem.em('away', 'show', realVisible),
        )}
        onClick={handleAwayClick}
        catchMove
      />
    )
  }

  const renderPopover = () => {
    return (
      <View className={classNames(bem.e('popover'))} style={popupInset}>
        <Popup
          {...popupProps}
          effect={mapDirectionPlacement[direction]}
          visible={realVisible}
          className={bem.e('popup')}
          contentClass={bem.e('content')}
          onEnter={handleEnter}
          onExited={handleExited}
          onMaskClick={handleMaskClick}
          catchMove
          onlyPopup
          onRequestClose={handleRequestClose}
        >
          {children ?? (
            <List className={bem.e('options')} inlaid>
              {options.map((option, index) => {
                const { value, ...restProps } = option
                return (
                  <DropdownOption
                    {...restProps}
                    key={index}
                    active={value === innerValue}
                    onClick={() => handleOptionClick(option)}
                  />
                )
              })}
            </List>
          )}
          <Halfline direction={direction === 'up' ? 'bottom' : 'top'} />
        </Popup>
      </View>
    )
  }

  return (
    <>
      <Pressable disabled={disabled}>
        {({ pressed }) => (
          <View
            {...restProps}
            className={classNames(
              bem.e('item'),
              bem.em('item', 'show', realVisible),
              bem.em('item', 'some-show', _itemShow),
              bem.em('item', 'disabled', disabled),
              bem.em('item', 'pressed', pressed),
              className,
            )}
            style={style}
            ref={itemRef}
            onClick={handleItemClick}
          >
            {renderLabel()}
            {renderTitle()}
            {renderValue()}
            {renderArrow()}
          </View>
        )}
      </Pressable>

      <Modal visible={realVisible || innerVisible || popoverVisible}>
        {renderPopover()}
        {renderAway()}
      </Modal>
    </>
  )
})

export default DropdownItem
