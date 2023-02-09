import { CSSProperties, ReactNode } from 'react'
import classNames from 'classnames'

const getRingPercent = (percent: number, r: number) => {
  const perimeter = Math.PI * 2 * r
  return (percent / 100) * perimeter + ' ' + perimeter
}

export interface ProgressCircleProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  percent?: number
  color?: string
  trackColor?: string
  size?: string | number
  thickness?: number
}

export function ProgressCircle(props: ProgressCircleProps) {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    size,
    thickness = 4,
    ...restProps
  } = props

  const radius = 50 - thickness / 2

  const progressClass = classNames('s-progress-circle', className)
  const progressStyle = {
    width: size,
    height: size,
    ...style,
  }

  const trackStyle = {
    stroke: trackColor,
    strokeWidth: thickness,
    r: radius,
  }

  const trailStyle = {
    stroke: color,
    strokeDasharray: getRingPercent(percent, radius),
    strokeWidth: thickness,
    r: radius,
  }

  return (
    <div {...restProps} className={progressClass} style={progressStyle}>
      <svg viewBox="0 0 100 100" className="s-progress-circle-graph">
        <circle
          cx="50"
          cy="50"
          fill="none"
          className="s-progress-circle-track"
          style={trackStyle}
        ></circle>
        <circle
          cx="50"
          cy="50"
          fill="none"
          className="s-progress-circle-trail"
          style={trailStyle}
        ></circle>
      </svg>
      {children}
    </div>
  )
}

export default ProgressCircle
