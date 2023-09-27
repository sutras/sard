import { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'

import { StepsStatus } from './index'
import { Icon, IconProps } from '../icon'
import { BaseProps } from '../base'
import { useBem, useEvent } from '../use'
import { filterNullish, isFunction } from '../utils'
import Pressable from '../pressable'

export interface StepsStepProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((status: StepsStatus) => ReactNode)
  status?: StepsStatus
  color?: string
  lineColor?: string
  disabled?: boolean
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
  iconProps?: IconProps | ((status: StepsStatus) => IconProps)
  onClick?: (event: ITouchEvent) => void
  center?: boolean
  direction?: 'vertical' | 'horizontal'
  clickable?: boolean
  _placement?: number
  _first?: boolean
  _last?: boolean
}

const mapStatusIcon = {
  finish: 'check-circle-fill',
  process: 'circle',
  wait: 'circle',
  error: 'x-circle',
}

function getPosition(num: number) {
  return num < 0 ? 'behind' : num === 0 ? 'self' : 'front'
}

export const StepsStep: FC<StepsStepProps> = (props) => {
  const {
    className,
    style,
    children,

    status = 'wait',
    color,
    lineColor,
    disabled = false,
    icon,
    iconProps,
    onClick,
    center,
    direction,
    clickable,
    _placement,
    _first,
    _last,
    ...restProps
  } = props

  const [bem] = useBem('steps')

  const placement = getPosition(_placement as number)

  const handleClick = useEvent((event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  })

  const lineClass = classNames(
    bem.e('line'),
    bem.em('line', 'behind', placement === 'behind'),
    bem.em('line', 'last', _last),
    bem.em('line', 'center-last', center && _last),
    bem.em('line', direction),
    bem.em('line', `${direction}-center-last`, center && _last),
  )

  return (
    <Pressable disabled={!clickable || disabled}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('step'),
            bem.em('step', 'last', _last),
            bem.em('step', 'center', center),
            bem.em('step', 'center-last', center && _last),
            bem.em('step', `${direction}-center`, center),
            bem.em('step', `${direction}-center-last`, center && _last),
            bem.em('step', direction),
            bem.em('step', `${direction}-last`, _last),
            bem.em('step', 'clickable', clickable),
            bem.em('step', 'disabled', disabled),
            className,
          )}
          style={style}
          onClick={handleClick}
        >
          <View
            className={classNames(
              bem.e('header'),
              bem.em('header', direction),
              bem.em('header', `${direction}-center`, center),
            )}
          >
            <View
              className={classNames(
                lineClass,
                bem.e('line-before'),
                bem.em('line-before', 'self', placement === 'self'),
                bem.em('line-before', 'first', _first),
                bem.em('line-before', 'center', center),
                bem.em('line-before', `${direction}-center`, center),
              )}
              style={filterNullish({
                backgroundColor:
                  placement === 'behind' || placement === 'self'
                    ? color
                    : lineColor,
              })}
            />
            {isFunction(icon)
              ? icon(status)
              : icon ?? (
                  <Icon
                    name={mapStatusIcon[status]}
                    {...(isFunction(iconProps) ? iconProps(status) : iconProps)}
                    color={
                      status === 'finish' || status === 'process'
                        ? color
                        : undefined
                    }
                    className={classNames(
                      bem.e('icon'),
                      bem.em('icon', status),
                      bem.em('icon', 'pressed', pressed),
                    )}
                  />
                )}
            <View
              className={classNames(
                lineClass,
                bem.e('line-after'),
                bem.em('line-after', 'last', _last),
                bem.em('line-after', 'center', center),
                bem.em('line-after', `${direction}-center`, center),
              )}
              style={filterNullish({
                backgroundColor: placement === 'behind' ? color : lineColor,
              })}
            />
          </View>
          <View
            className={classNames(
              bem.e('body'),
              bem.em('body', direction),
              bem.em('body', 'center', center),
              bem.em('body', `${direction}-center`, center),
              bem.em('body', 'pressed', pressed),
              bem.em('body', status),
            )}
            style={filterNullish({
              color: status === 'process' ? color : null,
            })}
          >
            {isFunction(children) ? children(status) : children}
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default StepsStep
