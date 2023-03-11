import { CSSProperties, ReactNode, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'

export interface ButtonProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'medium' | 'small' | 'large'
  round?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: ReactNode
  loadingProps?: LoadingProps
  onClick?: (event: MouseEvent) => void
  htmlType?: 'submit' | 'reset' | 'button'
  [propName: string]: any
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    type = 'default',
    theme = 'primary',
    size = 'medium',
    round = false,
    block = false,
    disabled = false,
    loading = false,
    loadingText,
    loadingProps,
    onClick,
    htmlType = 'button',
    ...restProps
  } = props

  const handleClick = (event: MouseEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  }

  const buttonClass = classNames(
    's-button',
    's-button-' + theme,
    's-button-' + type,
    {
      ['s-button-' + size]: size !== 'medium',
      's-button-round': round,
      's-button-block': block,
      's-button-disabled': disabled,
      's-button-loading': loading,
    },
    className,
  )

  return (
    <button
      {...restProps}
      className={buttonClass}
      disabled={disabled}
      onClick={handleClick}
      type={htmlType}
    >
      <div className="s-button-content">
        {loading ? (
          <>
            <Loading {...loadingProps}></Loading>
            {loadingText && (
              <span className="s-button-loading-text">{loadingText}</span>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </button>
  )
}

export default Button
