import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { CellGroup } from './Group'
import Icon from '../icon'

export * from './Group'

export interface CellProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  value?: ReactNode
  isLink?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
  arrow?: ReactNode
  icon?: ReactNode
  inset?: boolean
  onClick?: (event: MouseEvent) => void
}

export interface CellFC extends FC<CellProps> {
  Group: typeof CellGroup
}

export const Cell: CellFC = (props) => {
  const {
    className = '',
    children,
    title,
    label,
    value,
    isLink = false,
    arrowDirection = 'right',
    arrow,
    icon,
    inset,
    onClick,
    ...restProps
  } = props

  const cellClass = classNames(
    's-cell',
    {
      's-cell-is-link': isLink,
      's-cell-inset': inset,
    },
    className,
  )

  return (
    <div {...restProps} className={cellClass} onClick={onClick}>
      {icon !== undefined && (
        <div className="s-cell-header">
          <div className="s-cell-icon">{icon}</div>
        </div>
      )}
      <div className="s-cell-content">
        {children || (
          <>
            <div className="s-cell-body">
              {title !== undefined && (
                <div className="s-cell-title">{title}</div>
              )}
              {label !== undefined && (
                <div className="s-cell-label">{label}</div>
              )}
            </div>
            <div className="s-cell-footer">
              {value !== undefined && (
                <div className="s-cell-value">{value}</div>
              )}
              {isLink && (
                <div className="s-cell-arrow">
                  {arrow ?? <Icon prefix="si" name={arrowDirection}></Icon>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

Cell.Group = CellGroup

export default Cell
