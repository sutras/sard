import { ReactNode, forwardRef } from 'react'
import classNames from 'classnames'
import { Loading, LoadingProps } from '../loading'
import { ITouchEvent, Button as TaroButton, View } from '@tarojs/components'
import { BaseProps } from '../base'
import { filterNullish, isNullish, isPC, isRN, isVisibleEmpty } from '../utils'
import { useBem, useEvent } from '../use'
import CustomButton from './CustomButton'
import Pressable from '../pressable'
import Halfline from '../halfline'
import Ellipsis from '../ellipsis'
import Icon, { IconProps } from '../icon'

const ButtonElement = isRN || isPC() ? CustomButton : TaroButton

export interface ButtonProps extends BaseProps {
  type?: 'default' | 'pale' | 'mild' | 'outline' | 'text' | 'pale-text'
  theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  size?: 'mini' | 'small' | 'medium' | 'large'
  round?: boolean
  disabled?: boolean
  loading?: boolean
  loadingProps?: LoadingProps
  iconProps?: IconProps
  before?: ReactNode
  after?: ReactNode
  color?: string
  onClick?: (event: ITouchEvent) => void
  [key: PropertyKey]: any
}

const mapIconSize = {
  mini: 14,
  small: 16,
  medium: 18,
  large: 20,
}

export const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const {
    className,
    style,
    children,

    type = 'default',
    theme = 'primary',
    size = 'medium',
    round = false,
    disabled,
    loading,
    loadingProps,
    iconProps,
    before,
    after,
    color,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('button')

  const handleClick = useEvent((event: ITouchEvent) => {
    if (disabled || loading) {
      return
    }
    onClick?.(event)
  })

  return (
    <Pressable disabled={disabled || loading}>
      {({ pressed }) => (
        <ButtonElement
          {...restProps}
          ref={ref}
          className={classNames(
            bem.b(),
            bem.m(type),
            bem.m(`${type}-${theme}`),
            bem.m(size),
            bem.m('round', round),
            bem.m('disabled', disabled),
            bem.m('loading', loading),
            bem.m('pressed', pressed && type === 'pale-text'),
            bem.m('is-icon', !isNullish(iconProps)),
            className,
          )}
          style={style}
          disabled={disabled || loading || undefined}
          hoverClass=""
          onClick={handleClick}
        >
          {before}

          <View className={bem.e('loading-wrapper')}>
            {loading && (
              <Loading
                {...loadingProps}
                className={classNames(
                  bem.e('loading'),
                  bem.em('loading', `${type}-${theme}`),
                )}
                size={mapIconSize[size]}
                color={color}
              />
            )}
          </View>

          <Ellipsis
            mode="clip"
            className={classNames(
              bem.e('content'),
              bem.em('content', `${type}-${theme}`),
              bem.em('content', size),
              bem.em(
                'content',
                `gap-${size}`,
                loading && !isVisibleEmpty(children),
              ),
            )}
            style={filterNullish({
              color,
            })}
          >
            {isNullish(iconProps) ? children : <Icon {...iconProps} />}
          </Ellipsis>

          {after}

          {type === 'outline' && (
            <View className={bem.e('halfline-wrapper')}>
              <Halfline
                className={classNames(
                  bem.e('halfline'),
                  bem.em('halfline', theme),
                  bem.em('halfline', size),
                  bem.em('halfline', 'round', round),
                )}
                style={filterNullish({
                  borderColor: color,
                })}
              />
            </View>
          )}

          {type !== 'pale-text' && (
            <View
              className={classNames(
                bem.e('shade'),
                bem.em('shade', 'pressed', pressed),
                bem.em('shade', type),
              )}
            />
          )}
        </ButtonElement>
      )}
    </Pressable>
  )
})

export default Button
