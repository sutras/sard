import { CSSProperties, FC, ReactNode, MouseEvent, useMemo } from 'react'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { isFileUrl } from '../../utils'

export interface ShareSheetItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  name?: ReactNode
  label?: ReactNode
  color?: string
  background?: string
  icon?: IconProps | string
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
}

export const ShareSheetItem: FC<ShareSheetItemProps> = (props) => {
  const {
    className,
    children,
    name,
    label,
    color,
    background,
    icon,
    disabled,
    onClick,
    ...restProps
  } = props

  const isImg = useMemo(() => {
    return typeof icon === 'string' && isFileUrl(icon)
  }, [icon])

  const handleClick = (event: MouseEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const shareSheetItemClass = classNames(
    's-share-sheet-item',
    {
      's-share-sheet-item-disabled': disabled,
    },
    className,
  )

  const iconStyle = {
    color,
    backgroundColor: background,
  }

  return (
    <button
      {...restProps}
      type="button"
      className={shareSheetItemClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {children || (
        <>
          {isImg ? (
            <img className="s-share-sheet-img" src={icon as string} />
          ) : (
            <div className="s-share-sheet-icon" style={iconStyle}>
              <Icon {...(icon as IconProps)}></Icon>
            </div>
          )}
          {name && <div className="s-share-sheet-name">{name}</div>}
          {label && <div className="s-share-sheet-label">{label}</div>}
        </>
      )}
    </button>
  )
}

export default ShareSheetItem
