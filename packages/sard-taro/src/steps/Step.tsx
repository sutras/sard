import { FC, ReactNode } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'

import { StepsStatus } from './index'
import { Icon } from '../icon'
import { BaseProps } from '../base'

export interface StepsStepProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((status: StepsStatus) => ReactNode)
  status?: StepsStatus
  lineColor?: string
  disabled?: boolean
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
  onClick?: (event: ITouchEvent) => void
  _position?: number
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
    ...restProps
  } = props

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const stepClass = classNames(
    'sar-steps-step',
    `sar-steps-${status}`,
    {
      'sar-steps-disabled': disabled,
    },
    'sar-steps-position-' + getPosition(_position),
    className,
  )

  const lineStyle = {
    backgroundColor: lineColor,
  }

  return (
    <View {...restProps} className={stepClass} onClick={handleClick}>
      <View className="sar-steps-header">
        <View
          className="sar-steps-line sar-steps-line-before"
          style={lineStyle}
        ></View>
        <View className="sar-steps-icon">
          {typeof icon === 'function'
            ? icon(status)
            : icon ?? <Icon name={mapStatusIcon[status]}></Icon>}
        </View>
        <View
          className="sar-steps-line sar-steps-line-after"
          style={lineStyle}
        ></View>
      </View>
      <View className="sar-steps-body">
        {typeof children === 'function' ? children(status) : children}
      </View>
    </View>
  )
}

export default StepsStep
