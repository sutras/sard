import { CSSProperties, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'

export interface TabLabelProps {
  className?: string
  style?: CSSProperties
  activeStyle?: CSSProperties
  children?: ReactNode | ((active: boolean) => ReactNode)
  innerKey: number | string
  activeKey?: number | string
  onClick?: (innerKey: number | string) => void
  disabled?: boolean
  showLine?: boolean
  line?: ReactNode
  lineWidth?: string
  lineStyle?: CSSProperties
}

export const TabLabel = forwardRef<HTMLElement, TabLabelProps>((props, ref) => {
  const {
    className,
    style,
    activeStyle,
    children,
    innerKey,
    activeKey,
    onClick,
    disabled,
    showLine,
    line,
    lineWidth,
    lineStyle,
    ...restProps
  } = props

  const active = innerKey === activeKey

  const handleClick = () => {
    if (!disabled) {
      onClick?.(innerKey)
    }
  }

  const labelClass = classNames(
    's-tab-label',
    {
      's-tab-label-active': active,
      's-tab-label-disabled': disabled,
    },
    className,
  )

  const labelStyle = {
    ...style,
    ...(active ? activeStyle : null),
  }

  return (
    <div
      {...restProps}
      ref={ref as any}
      className={labelClass}
      style={labelStyle}
      onClick={handleClick}
    >
      {showLine &&
        (line ?? (
          <div
            className="s-tab-label-line"
            style={{ width: lineWidth, ...lineStyle }}
          ></div>
        ))}
      <div className="s-tab-label-text">
        {typeof children === 'function' ? children(active) : children}
      </div>
    </div>
  )
})

export default TabLabel
