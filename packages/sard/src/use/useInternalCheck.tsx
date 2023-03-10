import {
  CSSProperties,
  ReactNode,
  MouseEvent,
  ReactElement,
  Children,
  cloneElement,
} from 'react'
import classNames from 'classnames'
import { Icon } from '../components/icon'
import { pickNullish } from '../utils'
import { CheckContext, useCheck, useCheckGroup } from './useCheck'

type IconType = 'square' | 'circle' | 'record'

export interface InternalCheckProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  value?: any
  disabled?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (checked: boolean, value: any) => void
  onClick?: (event: MouseEvent) => void
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

  const [isChecked, toggle] = useCheck(
    checkType,
    props,
    {
      defaultValuePropName: 'defaultChecked',
      valuePropName: 'checked',
      defaultValue: false,
    },
    value,
  )

  const handleCheckboxClick = (event: MouseEvent) => {
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
    `s-${checkClass}`,
    {
      [`s-${checkClass}-checked`]: isChecked,
      [`s-${checkClass}-disabled`]: disabled,
    },
    className,
  )

  return (
    <div {...restProps} className={checkboxClass} onClick={handleCheckboxClick}>
      <div className={`s-${checkClass}-icon`} style={iconStyle}>
        {icon ? (
          icon(isChecked)
        ) : (
          <Icon prefix="si" name={mapTypeIcon[type][isChecked ? 1 : 0]}></Icon>
        )}
      </div>
      {children && <div className={`s-${checkClass}-label`}>{children}</div>}
    </div>
  )
}

export interface InternalCheckGroupProps<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? any : any[],
> {
  className?: string
  style?: CSSProperties
  children?: any
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

  const context = useCheckGroup(props, {
    defaultValue: checkType === 'single' ? '' : [],
  })

  const checkboxGroupClass = classNames(
    `s-${checkClass}-group`,
    {
      [`s-${checkClass}-group-vertical`]: vertical,
    },
    className,
  )

  return (
    <div {...restProps} className={checkboxGroupClass}>
      <CheckContext.Provider value={context}>
        {Children.map(children, (element: ReactElement<InternalCheckProps>) => {
          return cloneElement(element, {
            ...element.props,
            ...pickNullish(element.props, props, [
              'disabled',
              'size',
              'icon',
              'checkedColor',
              'type',
            ]),
          })
        })}
      </CheckContext.Provider>
    </div>
  )
}
