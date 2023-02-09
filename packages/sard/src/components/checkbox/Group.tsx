import {
  createContext,
  CSSProperties,
  ReactNode,
  cloneElement,
  ReactElement,
  Children,
  FC,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { pickNullish } from '../../utils'

import { CheckboxProps } from './index'

export interface CheckboxGroupContext {
  value: any[]
  onChange: (value: any[]) => void
}

export const CheckboxGroupContext = createContext<CheckboxGroupContext | null>(
  null,
)

export interface CheckboxGroupProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  value?: any[]
  defaultValue?: any[]
  vertical?: boolean
  disabled?: boolean
  size?: string | number
  type?: CheckboxProps['type']
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  children?: any
  onChange?: (value: any[]) => void
}

export const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
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

  const [innerValue, setInnerValue] = useControlledValue<any[]>(props, {
    defaultValue: [],
  })

  const innerChange = (val: any) => {
    setInnerValue(val)
  }

  const context = useMemo(
    () => ({
      value: innerValue,
      onChange: innerChange,
    }),
    [innerValue, innerChange],
  )

  const checkboxGroupClass = classNames(
    's-checkbox-group',
    {
      's-checkbox-group-vertical': vertical,
    },
    className,
  )

  return (
    <div {...restProps} className={checkboxGroupClass}>
      <CheckboxGroupContext.Provider value={context}>
        {Children.map(
          children as ReactElement<CheckboxProps>,
          (element: ReactElement<CheckboxProps>) => {
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
          },
        )}
      </CheckboxGroupContext.Provider>
    </div>
  )
}

export default CheckboxGroup
