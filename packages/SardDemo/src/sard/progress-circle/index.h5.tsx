import { FC } from 'react'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { useBem } from '../use'

const getRingPercent = (percent: number, r: number) => {
  const perimeter = Math.PI * 2 * r
  return (percent / 100) * perimeter + ' ' + perimeter
}

export interface ProgressCircleProps extends BaseProps {
  percent?: number
  color?: string
  trackColor?: string
  size?: number
  thickness?: number
}

export const ProgressCircle: FC<ProgressCircleProps> = (props) => {
  const {
    className,
    style,
    children,

    percent = 0,
    color,
    trackColor,
    size = 100,
    thickness = 4,
    ...restProps
  } = props

  const [bem] = useBem('progress-circle')

  const radius = 50 - thickness / 2

  return (
    <div
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        width: size,
        height: size,
      }}
    >
      <svg viewBox="0 0 100 100" className={bem.e('graph')}>
        <circle
          cx="50"
          cy="50"
          fill="none"
          className={bem.e('track')}
          strokeWidth={thickness}
          r={radius}
          style={{
            stroke: trackColor,
          }}
        />
        <circle
          cx="50"
          cy="50"
          fill="none"
          className={bem.e('trail')}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-90)"
          strokeDasharray={getRingPercent(percent, radius)}
          strokeWidth={thickness}
          r={radius}
          style={{
            transformOrigin: 'center',
            stroke: color,
          }}
        />
      </svg>
      {children}
    </div>
  )
}

export default ProgressCircle
