import {
  CSSProperties,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
} from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { isNullish, pickNullish } from '../utils'
import { CheckContext, useCheck, useCheckGroup } from './useCheck'
import { ITouchEvent, View } from '@tarojs/components'
import useBem from './useBem'
import { AnyType } from '../base'

type IconType = 'square' | 'circle' | 'record'

type ValueType = AnyType

export interface InternalCheckProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  value?: ValueType
  disabled?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (checked: boolean, value: ValueType) => void
  onClick?: (event: ITouchEvent) => void
}

const mapTypeIcon = {
  square: ['square', 'check-square-fill'],
  circle: ['circle', 'check-circle-fill'],
  record: ['circle', 'record-circle'],
}

export const useInternalCheck = <T extends 'single' | 'multiple'>(
  checkType: T,
  checkClass: string,
  props: InternalCheckProps,
) => {
  const {
    className,
    children,
    checked,
    defaultChecked,
    value,
    disabled = false,
    size,
    type = checkType === 'single' ? 'record' : 'square',
    onChange,
    onClick,
    icon,
    checkedColor,
    ...restProps
  } = props

  const [bem] = useBem(checkClass)

  const [isChecked, toggle] = useCheck(
    checkType,
    {
      defaultValue: defaultChecked,
      value: checked,
      trigger: onChange,
      initialValue: false,
    },
    value,
  )

  const handleCheckboxClick = (event: ITouchEvent) => {
    if (!disabled) {
      toggle()
    }
    onClick?.(event)
  }

  const iconStyle = {
    fontSize: size,
    color: isChecked ? checkedColor : '',
  }

  const checkboxClass = classNames(
    bem.b(),
    bem.m('checked', isChecked),
    bem.m('disabled', disabled),
    className,
  )

  return (
    <View
      {...restProps}
      className={checkboxClass}
      onClick={handleCheckboxClick}
    >
      <View
        className={classNames(
          bem.e('icon'),
          bem.em('icon', 'checked', isChecked),
        )}
        style={iconStyle}
      >
        {icon ? (
          icon(isChecked)
        ) : (
          <Icon name={mapTypeIcon[type][isChecked ? 1 : 0]}></Icon>
        )}
      </View>
      {!isNullish(children) && (
        <View className={bem.e('label')}>{children}</View>
      )}
    </View>
  )
}

export interface InternalCheckGroupProps<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? ValueType : ValueType[],
> {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: V
  defaultValue?: V
  vertical?: boolean
  disabled?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (value: V) => void
}

export const useInternalCheckGroup = <T extends 'single' | 'multiple'>(
  checkType: T,
  checkClass: string,
  props: InternalCheckGroupProps<T>,
) => {
  const {
    className,
    value,
    defaultValue,
    vertical,
    disabled,
    size,
    type,
    icon,
    checkedColor,
    children,
    onChange,
    ...restProps
  } = props

  const [bem] = useBem(checkClass)
  const [gBem] = useBem(`${checkClass}-group`)

  const context = useCheckGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () =>
      (checkType === 'single' ? '' : []) as T extends 'single'
        ? ValueType
        : ValueType[],
  })

  const checkboxGroupClass = classNames(
    gBem.b(),
    gBem.m('vertical', vertical),
    className,
  )

  return (
    <View {...restProps} className={checkboxGroupClass}>
      <CheckContext.Provider value={context}>
        {Children.map(
          children,
          (element: ReactElement<InternalCheckProps>, index: number) => {
            return cloneElement(element, {
              ...element.props,
              className: classNames(
                bem.m(index === 0 ? 'first' : 'later', !vertical),
                bem.m(
                  index === 0 ? 'vertical-first' : 'vertical-later',
                  vertical,
                ),
                element.props.className,
              ),
              ...pickNullish(
                {
                  disabled,
                  size,
                  type,
                  icon,
                  checkedColor,
                },
                element.props,
              ),
            })
          },
        )}
      </CheckContext.Provider>
    </View>
  )
}
