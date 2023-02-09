import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { LoadingProps } from '../loading'
import Loading from '../loading'

export interface ActionSheetItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  label?: ReactNode
  color?: string
  loading?: boolean
  loadingProps?: LoadingProps
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

export const ActionSheetItem: FC<ActionSheetItemProps> = (props) => {
  const {
    className,
    style,
    children,
    title,
    label,
    color,
    loading,
    loadingProps,
    disabled,
    onClick,
    ...restProps
  } = props

  const handleClick = (event: MouseEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  }

  const actionSheetItemClass = classNames(
    's-action-sheet-item',
    {
      's-action-sheet-item-disabled': disabled,
      's-action-sheet-item-loading': loading,
    },
    className,
  )
  const actionSheetItemStyle = {
    color,
    ...style,
  }

  return (
    <button
      {...restProps}
      type="button"
      className={actionSheetItemClass}
      style={actionSheetItemStyle}
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? (
        <Loading {...loadingProps}></Loading>
      ) : (
        <>
          {title && <div className="s-action-sheet-item-title">{title}</div>}
          {label && <div className="s-action-sheet-item-label">{label}</div>}
        </>
      )}
    </button>
  )
}

export default ActionSheetItem
