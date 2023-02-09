import {
  createContext,
  CSSProperties,
  ReactNode,
  Children,
  ReactElement,
  cloneElement,
  FC,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { pickNullish } from '../../utils'

import { RadioProps } from './index'

export interface RadioGroupContext {
  value: any
  onChange: (value: any) => void
}

export const RadioGroupContext = createContext<RadioGroupContext | null>(null)

export interface RadioGroupProps {
  className?: string
  style?: CSSProperties
  children?: any
  value?: any
  defaultValue?: any
  vertical?: boolean
  disabled?: boolean
  size?: string | number
  type?: RadioProps['type']
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (value: any) => void
}

export const RadioGroup: FC<RadioGroupProps> = (props) => {
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

  const [innerValue, setInnerValue] = useControlledValue<any>(props, {
    defaultValue: '',
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

  const radioGroupClass = classNames(
    's-radio-group',
    {
      's-radio-group-vertical': vertical,
    },
    className,
  )

  return (
    <div {...restProps} className={radioGroupClass}>
      <RadioGroupContext.Provider value={context}>
        {Children.map(
          children as ReactElement<RadioProps>,
          (element: ReactElement<RadioProps>) => {
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
      </RadioGroupContext.Provider>
    </div>
  )
}

export default RadioGroup
