import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface LoadingProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  type?: 'spinner' | 'clock' | 'circular'
  color?: string
  size?: string | number
  text?: ReactNode
  vertical?: boolean
}

const clockIcon = Array(12)
  .fill(0)
  .map((_, i) => <div key={i} className="s-loading-scale"></div>)

const spinIcon = (
  <svg viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="22" fill="none" />
  </svg>
)

export const Loading: FC<LoadingProps> = (props) => {
  const {
    className,
    style,
    children,
    type = 'spinner',
    color = '',
    size = '',
    text = '',
    vertical = false,
    ...restProps
  } = props

  const loadingClass = classNames(
    's-loading',
    {
      's-loading-vertical': vertical,
    },
    className,
  )
  const loadingStyle = {
    color,
    ...style,
  }
  const iconClass = classNames('s-loading-icon', 's-loading-' + type)
  const iconStyle = {
    fontSize: size,
  }

  const renderIcon = () => {
    return (
      <div className={iconClass} style={iconStyle}>
        {type === 'spinner' ? spinIcon : type === 'clock' ? clockIcon : null}
      </div>
    )
  }

  const renderText = () => {
    return (
      (children || text) && (
        <div className="s-loading-text">{children || text}</div>
      )
    )
  }

  return (
    <div {...restProps} className={loadingClass} style={loadingStyle}>
      {renderIcon()}
      {renderText()}
    </div>
  )
}

export default Loading
