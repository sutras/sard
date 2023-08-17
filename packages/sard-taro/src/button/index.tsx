import { ReactNode, FC } from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import {
  type ButtonProps as TaroButtonProps,
  Button as TaroButton,
  View,
} from '@tarojs/components'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem } from '../use'

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
  [key: PropertyKey]: any
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
    disabled,
    loading,
    loadingText,
    loadingProps,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('button')

  const handleClick = (event) => {
    if (disabled || loading) {
      return
    }

    onClick?.(event)
  }

  return (
    <TaroButton
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m(type),
        bem.m(`${type}-${theme}`),
        bem.m(size, size !== 'medium'),
        bem.m('round', round),
        bem.m('block', block),
        bem.m('disabled', disabled),
        bem.m('loading', loading),
        className,
      )}
      disabled={disabled || loading || undefined}
      hoverClass={bem.m('hover')}
      onClick={handleClick}
    >
      {loading ? (
        <>
          <Loading
            {...loadingProps}
            iconClass={classNames(
              bem.e('loading-icon'),
              loadingProps?.iconClass,
            )}
          ></Loading>
          {!isNullish(loadingText) && (
            <View className={bem.e('loading-text')}>{loadingText}</View>
          )}
        </>
      ) : (
        children
      )}
    </TaroButton>
  )
}

export default Button
