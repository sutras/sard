import { CSSProperties, forwardRef, ReactNode } from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'

export interface TabLabelProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  activeStyle?: CSSProperties
  children?: ReactNode | ((active: boolean) => ReactNode)
  name: any
  activeKey?: any
  onClick?: (name: any) => void
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
    name,
    activeKey,
    onClick,
    disabled,
    showLine,
    line,
    lineWidth,
    lineStyle,
    ...restProps
  } = props

  const active = name === activeKey

  const handleClick = () => {
    if (!disabled) {
      onClick?.(name)
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
