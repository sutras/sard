import {
  CSSProperties,
  useState,
  ReactNode,
  MouseEvent,
  FocusEvent,
  ChangeEvent,
  useRef,
  useEffect,
  forwardRef,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { Icon } from '../icon'
import { AutoHeight, resizeTextArea } from '../../utils/dom'

export interface InputProps {
  className?: string
  style?: CSSProperties
  value?: string | number
  defaultValue?: string | number
  type?: 'text' | 'number' | 'tel' | 'password' | 'textarea' | 'url' | 'search'
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  maxLength?: number
  showCount?: boolean
  autoFocus?: boolean
  autoHeight?: AutoHeight
  borderless?: boolean
  inlaid?: boolean
  prepend?: ReactNode
  append?: ReactNode
  rows?: number
  clearable?: boolean
  clear?: ReactNode
  onClear?: (value: '') => void
  onChange?: (value: string) => void
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onClick?: (event: MouseEvent) => void
}

type InputRef = HTMLInputElement | HTMLTextAreaElement

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
  const {
    className,
    value,
    defaultValue,
    type = 'text',
    placeholder = '',
    disabled,
    readOnly,
    maxLength,
    showCount,
    autoHeight,
    borderless,
    inlaid,
    prepend,
    append,
    rows,
    clearable,
    clear,
    onClear,
    onChange,
    onFocus,
    onBlur,
    onClick,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<string | number>(
    props,
    {
      defaultValue: '',
    },
  )

  const [focused, setFocused] = useState(false)

  const handleFocus = (event: FocusEvent) => {
    setFocused(true)
    onFocus?.(event)
  }

  const handleBlur = (event: FocusEvent) => {
    setFocused(false)
    onBlur?.(event)
  }

  const handleClear = () => {
    setInnerValue('')
    onClear?.('')
  }

  const innerMaxLength = Number(maxLength) || 0

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let value = event.target.value
    if (innerMaxLength) {
      value = value.slice(0, innerMaxLength)
    }
    setInnerValue(value)
  }

  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>()

  useEffect(() => {
    if (type === 'textarea' && inputRef.current) {
      resizeTextArea(inputRef.current, autoHeight)
    }
  }, [innerValue, autoHeight, type])

  const inputClass = classNames(
    's-input',
    {
      's-input-inlaid': inlaid,
      's-input-borderless': borderless,
      's-input-disabled': disabled,
      's-input-readonly': readOnly,
      's-input-focused': focused,
      's-input-is-textarea': type === 'textarea',
    },
    className,
  )

  const controlProps = {
    className: 's-input-control',
    autoComplete: 'off',
    value: innerValue,
    placeholder,
    disabled,
    readOnly,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
  }

  const refCallback = (el) => {
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      ref.current = el
    }
    inputRef.current = el
  }

  return (
    <div {...restProps} className={inputClass}>
      {prepend && <div className="s-input-prepend">{prepend}</div>}
      {type === 'textarea' ? (
        <textarea
          {...controlProps}
          ref={refCallback}
          rows={autoHeight ? 1 : rows}
        />
      ) : (
        <input {...controlProps} ref={refCallback} type={type} />
      )}
      {append && <div className="s-input-append">{append}</div>}
      {clearable && innerValue && (
        <div className="s-input-clear" onClick={handleClear}>
          {clear || (
            <Icon
              prefix="si"
              name="x-circle-fill"
              className="s-input-clear-icon"
            ></Icon>
          )}
        </div>
      )}
      {showCount && (
        <div className="s-input-count">
          {String(innerValue).length}
          {innerMaxLength && ' / ' + innerMaxLength}
        </div>
      )}
    </div>
  )
})

export default Input
