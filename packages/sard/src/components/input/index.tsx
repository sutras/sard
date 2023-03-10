import {
  CSSProperties,
  useState,
  ReactNode,
  MouseEvent,
  FocusEvent,
  ChangeEvent,
  CompositionEvent,
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

  const handleClear = (event: MouseEvent) => {
    event.stopPropagation()

    setInnerValue('')
    onClear?.('')
  }

  const innerMaxLength = Number(maxLength) || 0

  const limitMaxLength = (value: string) => {
    if (innerMaxLength) {
      return value.slice(0, innerMaxLength)
    }
    return value
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (isComposing.current) {
      setInnerValue(event.target.value)
    } else {
      setInnerValue(limitMaxLength(event.target.value))
    }
  }

  const isComposing = useRef(false)

  const handleCompositionStart = () => {
    isComposing.current = true
  }

  const handleCompositionEnd = (
    event: CompositionEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    isComposing.current = false

    setInnerValue(
      limitMaxLength(
        (event.target as HTMLInputElement | HTMLTextAreaElement).value,
      ),
    )
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
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick,
  }

  const inputRefCb = (el) => {
    if (typeof ref === 'function') {
      ref(el)
    } else if (ref) {
      ref.current = el
    }
    inputRef.current = el
  }

  const handleRootClick = (event: MouseEvent) => {
    if (event.currentTarget === event.target) {
      inputRef.current?.focus()
    }

    onClick?.(event)
  }

  return (
    <div {...restProps} className={inputClass} onClick={handleRootClick}>
      {prepend && <div className="s-input-prepend">{prepend}</div>}
      {type === 'textarea' ? (
        <textarea
          {...controlProps}
          ref={inputRefCb}
          rows={autoHeight ? 1 : rows}
        />
      ) : (
        <input {...controlProps} ref={inputRefCb} type={type} />
      )}
      {append && <div className="s-input-append">{append}</div>}
      {clearable && innerValue && (
        <button className="s-input-clear" onClick={handleClear} type="button">
          {clear || (
            <Icon
              prefix="si"
              name="x-circle-fill"
              className="s-input-clear-icon"
            ></Icon>
          )}
        </button>
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
