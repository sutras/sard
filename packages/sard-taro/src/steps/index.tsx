import { Children, cloneElement, FC, ReactElement, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { StepsStep, StepsStepProps } from './Step'
import { BaseProps } from '../base'

export * from './Step'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsProps extends BaseProps {
  center?: boolean
  vertical?: boolean
  current?: number
  status?: StepsStatus
  lineColor?: string
  clickable?: boolean
  disabled?: boolean
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
}

export interface StepsFC extends FC<StepsProps> {
  Step: typeof StepsStep
}

export const Steps: StepsFC = (props) => {
  const {
    className,
    children,
    center = false,
    vertical,
    current = 0,
    status,
    lineColor,
    clickable,
    disabled = false,
    icon,
    ...restProps
  } = props

  const stepsClass = classNames(
    'sar-steps',
    {
      'sar-steps-vertical': vertical,
      'sar-steps-center': center,
      'sar-steps-clickable': clickable,
    },
    className,
  )

  return (
    <View {...restProps} className={stepsClass}>
      {Children.map(children, (item: ReactElement<StepsStepProps>, index) => {
        return cloneElement(item, {
          status:
            item.props.status ??
            (index < current
              ? 'finish'
              : index === current
              ? status ?? 'process'
              : 'wait'),
          lineColor: item.props.lineColor ?? lineColor,
          disabled: item.props.disabled ?? disabled,
          icon: item.props.icon ?? icon,
          _position: index - current,
        })
      })}
    </View>
  )
}

Steps.Step = StepsStep

export default Steps
