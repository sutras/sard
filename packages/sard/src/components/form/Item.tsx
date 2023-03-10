import {
  cloneElement,
  CSSProperties,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import classNames from 'classnames'

import FormContext from './FormContext'
import FieldStore from './FieldStore'

export interface FormItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  label?: ReactNode
  labelWidth?: number | string
  error?: ReactNode
  name?: string
  valuePropName?: string
  trigger?: string
  initialValue?: any
  getValueFromEvent?: (...args: any[]) => any
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    className,
    style,
    children,
    label,
    labelWidth,
    error,
    name,
    valuePropName = 'value',
    trigger = 'onChange',
    initialValue,
    getValueFromEvent = (value) => value,
    ...restProps
  } = props

  const formStore = useContext(FormContext)

  const fieldStore = useMemo(() => {
    return new FieldStore()
  }, [])

  const [value, setValue] = useState(() => {
    return name ? formStore.initialValue[name] ?? initialValue : initialValue
  })

  fieldStore.name = name
  fieldStore.value = value

  useEffect(() => {
    if (name) {
      formStore.registerField(fieldStore)
    }

    return () => {
      if (name) {
        formStore.unregisterField(fieldStore)
      }
    }
  }, [name])

  const isElement = isValidElement(children)

  const renderElement = (element: ReactElement) => {
    if (name) {
      return cloneElement(element, {
        [valuePropName]: value,
        [trigger]: (...args) => {
          setValue(getValueFromEvent(...args))
        },
      })
    }
    return element
  }

  return (
    <div {...restProps} className={classNames('s-form-item', className)}>
      <div
        className="s-form-item-label"
        style={{
          width: labelWidth,
        }}
      >
        {label}
      </div>
      <div className="s-form-item-content">
        {isElement ? renderElement(children) : children}
        {error && <div className="s-form-item-error">{error}</div>}
      </div>
    </div>
  )
}

export default FormItem
