import { Children, cloneElement, FC, ReactElement, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { StepsStep, StepsStepProps } from './Step'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { IconProps } from '../icon'
import { pickNonNullish } from '../utils'

export * from './Step'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsProps extends BaseProps {
  center?: boolean
  direction?: 'vertical' | 'horizontal'
  current?: number
  status?: StepsStatus
  color?: string
  lineColor?: string
  clickable?: boolean
  disabled?: boolean
  icon?: ReactNode | ((status: StepsStatus) => ReactNode)
  iconProps?: IconProps | ((status: StepsStatus) => IconProps)
}

export interface StepsFC extends FC<StepsProps> {
  Step: typeof StepsStep
}

export const Steps: StepsFC = (props) => {
  const {
    className,
    style,
    children,

    center = false,
    direction = 'horizontal',
    current = 0,
    status,
    color,
    lineColor,
    clickable,
    disabled = false,
    icon,
    iconProps,
    ...restProps
  } = props

  const [bem] = useBem('steps')

  const count = Children.count(children)

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m(direction), className)}
      style={style}
    >
      {Children.map(children, (item: ReactElement<StepsStepProps>, index) => {
        return cloneElement(item, {
          status:
            item.props.status ??
            (index < current
              ? 'finish'
              : index === current
              ? status ?? 'process'
              : 'wait'),
          ...pickNonNullish(
            {
              color,
              lineColor,
              disabled,
              icon,
              iconProps,
            },
            item.props,
          ),
          center,
          direction,
          clickable,
          _placement: index - current,
          _first: index === 0,
          _last: index === count - 1,
        })
      })}
    </View>
  )
}

Steps.Step = StepsStep

export default Steps
