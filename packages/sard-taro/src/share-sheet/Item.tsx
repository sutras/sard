import { FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import { Image, Button, View, ITouchEvent } from '@tarojs/components'
import { Icon, IconProps } from '../icon'
import { isFileUrl, isString } from '../utils'
import { BaseProps } from '../base'

export interface ShareSheetItemProps extends BaseProps {
  name?: ReactNode
  label?: ReactNode
  color?: string
  background?: string
  icon?: IconProps | string
  disabled?: boolean
  onClick?: (event: ITouchEvent) => void
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
    return isString(icon) && isFileUrl(icon)
  }, [icon])

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const shareSheetItemClass = classNames(
    'sar-share-sheet-item',
    {
      'sar-share-sheet-item-disabled': disabled,
    },
    className,
  )

  const iconStyle = {
    color,
    backgroundColor: background,
  }

  return (
    <Button
      {...restProps}
      className={shareSheetItemClass}
      onClick={handleClick}
      disabled={disabled}
    >
      {children ?? (
        <>
          {isImg ? (
            <Image className="sar-share-sheet-img" src={icon as string} />
          ) : (
            <View className="sar-share-sheet-icon" style={iconStyle}>
              <Icon size={24} {...(icon as IconProps)}></Icon>
            </View>
          )}
          {name && <View className="sar-share-sheet-name">{name}</View>}
          {label && <View className="sar-share-sheet-label">{label}</View>}
        </>
      )}
    </Button>
  )
}

export default ShareSheetItem
