import { ReactNode, FC } from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import {
  type ButtonProps as TaroButtonProps,
  Button as TaroButton,
} from '@tarojs/components'
import { AnyType, BaseProps } from '../base'
import { isNullish } from '../utils'

type TaroButtonPropsBase = Omit<
  TaroButtonProps,
  | 'className'
  | 'style'
  | 'children'
  | 'size'
  | 'type'
  | 'plain'
  | 'disabled'
  | 'hoverClass'
  | 'hoverStyle'
>

export interface ButtonProps extends TaroButtonPropsBase, BaseProps {
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'medium' | 'small' | 'large'
  round?: boolean
  block?: boolean
  disabled?: boolean
  loading?: boolean
  loadingText?: ReactNode
  loadingProps?: LoadingProps
  [key: PropertyKey]: AnyType
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
    ...restProps
  } = props

  const buttonClass = classNames(
    'sar-button',
    'sar-button-' + theme,
    'sar-button-' + type,
    {
      ['sar-button-' + size]: size !== 'medium',
      'sar-button-round': round,
      'sar-button-block': block,
      'sar-button-disabled': disabled,
      'sar-button-loading': loading,
    },
    className,
  )

  return (
    <TaroButton
      {...restProps}
      className={buttonClass}
      disabled={disabled || loading}
      hoverClass="sar-button-hover"
    >
      {loading ? (
        <>
          <Loading
            {...loadingProps}
            iconClass={classNames(
              'sar-button-loading-icon',
              loadingProps?.iconClass,
            )}
          ></Loading>
          {!isNullish(loadingText) && (
            <span className="sar-button-loading-text">{loadingText}</span>
          )}
        </>
      ) : (
        children
      )}
    </TaroButton>
  )
}

export default Button
