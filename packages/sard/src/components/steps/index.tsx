import {
  CSSProperties,
  ReactNode,
  Children,
  cloneElement,
  FC,
  ReactElement,
} from 'react'
import classNames from 'classnames'

import { StepsStep, StepsStepProps } from './Step'

export * from './Step'

export type StepsStatus = 'wait' | 'process' | 'error' | 'finish'

export interface StepsProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  center?: boolean
  vertical?: boolean
  current?: number
  status?: StepsStatus
  lineColor?: string
  clickable?: boolean
  disabled?: boolean
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
    ...restProps
  } = props

  const stepsClass = classNames(
    's-steps',
    {
      's-steps-vertical': vertical,
      's-steps-center': center,
      's-steps-clickable': clickable,
    },
    className,
  )

  return (
    <div {...restProps} className={stepsClass}>
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
        })
      })}
    </div>
  )
}

Steps.Step = StepsStep

export default Steps
