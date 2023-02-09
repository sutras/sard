import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface ProgressBarProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  percent?: number
  color?: string
  trackColor?: string
  striped?: boolean
  animated?: boolean
  thickness?: string | number
}

export const ProgressBar: FC<ProgressBarProps> = (props) => {
  const {
    className,
    style,
    children,
    percent = 0,
    color,
    trackColor,
    striped,
    animated,
    thickness,
    ...restProps
  } = props

  const progressClass = classNames(
    's-progress-bar',
    {
      's-progress-bar-striped': striped,
      's-progress-bar-animated': animated,
    },
    className,
  )
  const progressStyle = {
    backgroundColor: trackColor,
    height: thickness,
    ...style,
  }
  const trailClass = classNames('s-progress-bar-trail')
  const trailStyle = {
    width: `${percent}%`,
    backgroundColor: color,
  }

  return (
    <div {...restProps} className={progressClass} style={progressStyle}>
      <div className={trailClass} style={trailStyle}>
        {children}
      </div>
    </div>
  )
}

export default ProgressBar
