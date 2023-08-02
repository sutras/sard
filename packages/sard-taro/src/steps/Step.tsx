import { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'

import { StepsStatus } from './index'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface StepsStepProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((status: StepsStatus) => ReactNode)
  status?: StepsStatus
  lineColor?: string
  disabled?: boolean
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
  onClick?: (event: ITouchEvent) => void
  _position?: number
  first?: boolean
  last?: boolean
  center?: boolean
  vertical?: boolean
  clickable?: boolean
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
    children,
    icon,
    status = 'wait',
    lineColor,
    disabled = false,
    onClick,
    _position,
    first,
    last,
    center,
    vertical,
    clickable,
    ...restProps
  } = props

  const [bem] = useBem('steps')

  const position = getPosition(_position)

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const lineStyle = {
    backgroundColor: lineColor,
  }

  const lineClass = classNames(
    bem.e('line'),
    bem.em('line', 'behind', position === 'behind'),
    bem.em('line', 'last', last),
    bem.em('line', 'center-last', center && last),
    bem.em('line', 'vertical', vertical),
    bem.em('line', 'vertical-center-last', vertical && center && last),
  )

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('step'),
        bem.em('step', 'last', last),
        bem.m(status),
        bem.m(`position-${position}`),
        bem.em('step', 'center', center),
        bem.em('step', 'center-last', center && last),
        bem.em('step', 'vertical', vertical),
        bem.em('step', 'vertical-last', vertical && last),
        bem.em('step', 'vertical-center', vertical && center),
        bem.em('step', 'vertical-center-last', vertical && center && last),
        bem.em('step', 'interactive', clickable && !disabled),
        bem.em('step', 'disabled', disabled),
        className,
      )}
      onClick={handleClick}
    >
      <View
        className={classNames(
          bem.e('header'),
          bem.em('header', 'vertical', vertical),
          bem.em('header', 'vertical-center', vertical && center),
        )}
      >
        <View
          className={classNames(
            lineClass,
            bem.e('line-before'),
            bem.em('line-before', 'self', position === 'self'),
            bem.em('line-before', 'first', first),
            bem.em('line-before', 'center', center),
            bem.em('line-before', 'vertical-center', vertical && center),
          )}
          style={lineStyle}
        ></View>
        <View className={classNames(bem.e('icon'), bem.em('icon', status))}>
          {typeof icon === 'function'
            ? icon(status)
            : icon ?? <Icon name={mapStatusIcon[status]}></Icon>}
        </View>
        <View
          className={classNames(
            lineClass,
            bem.e('line-after'),
            bem.em('line-after', 'last', last),
            bem.em('line-after', 'center', center),
            bem.em('line-after', 'vertical-center', vertical && center),
          )}
          style={lineStyle}
        ></View>
      </View>
      <View
        className={classNames(
          bem.e('body'),
          bem.em('body', 'vertical', vertical),
        )}
      >
        {typeof children === 'function' ? children(status) : children}
      </View>
    </View>
  )
}

export default StepsStep
