import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface CellGroupProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  inlaid?: boolean
}

export const CellGroup: FC<CellGroupProps> = (props) => {
  const { className = '', children, title, label, inlaid, ...restProps } = props

  const cellGroupClass = classNames(
    's-cell-group',
    {
      's-cell-group-inlaid': inlaid,
    },
    className,
  )

  return (
    <div {...restProps} className={cellGroupClass}>
      {title && (
        <div className="s-cell-group-header">
          <div className="s-cell-group-title">{title}</div>
        </div>
      )}
      <div className="s-cell-group-body">{children}</div>
      {label && (
        <div className="s-cell-group-footer">
          <div className="s-cell-group-label">{label}</div>
        </div>
      )}
    </div>
  )
}

export default CellGroup
