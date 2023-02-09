import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'

export interface PasswordInputProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  length?: number
  type?: 'border' | 'underline'
  gap?: number | string
  plainText?: boolean
  focused?: boolean
  defaultFocused?: boolean
  onFocused?: (focused: boolean) => void
  onClick?: (event: MouseEvent) => void
  native?: boolean
}

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const {
    className,
    style,
    children,
    value,
    defaultValue,
    onChange,
    length = 6,
    type = 'border',
    gap,
    plainText,
    focused,
    defaultFocused,
    onFocused,
    onClick,
    native,
    ...restProps
  } = props

  const [innerValue, setInnerValue] = useControlledValue<string>(props, {
    defaultValue: '',
  })

  const [innerFocused, setInnerFocused] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultFocused',
    valuePropName: 'focused',
    trigger: 'onFocused',
    defaultValue: false,
  })

  const handleClick = (event: MouseEvent) => {
    onClick?.(event)
  }

  const handleChange = (event: any) => {
    setInnerValue((event.target.value ?? event.detail.value).slice(0, length))
  }

  const handleFocus = () => {
    setInnerFocused(true)
  }

  const handleBlur = () => {
    setInnerFocused(false)
  }

  const passwordInputClass = classNames(
    's-password-input',
    `s-password-input-${type}`,
    {
      's-password-input-gapless': gap === 0,
    },
    className,
  )

  const passwordInputStyle = {
    ...style,
    gap,
  }

  return (
    <div
      {...restProps}
      className={passwordInputClass}
      onClick={handleClick}
      style={passwordInputStyle}
    >
      {Array(length)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              key={i}
              className={classNames('s-password-input-item', {
                's-password-input-item-active':
                  innerFocused &&
                  (i === innerValue.length ||
                    (i === innerValue.length - 1 && i === length - 1)),
              })}
            >
              {i < innerValue.length &&
                (plainText ? (
                  <div className="s-password-input-plaintext">
                    {innerValue[i]}
                  </div>
                ) : (
                  <div className="s-password-input-ciphertext"></div>
                ))}
              {innerFocused && i === innerValue.length && (
                <div className="s-password-input-cursor"></div>
              )}
            </div>
          )
        })}

      {native && (
        <input
          className="s-password-input-input"
          value={innerValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  )
}

export default PasswordInput
