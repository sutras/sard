import { FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import { Image, View, ITouchEvent } from '@tarojs/components'
import { Icon, IconProps } from '../icon'
import { isFileUrl, isString } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'

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

  const [bem] = useBem('share-sheet')

  const isImg = useMemo(() => {
    return isString(icon) && isFileUrl(icon)
  }, [icon])

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('item'),
        bem.em('item', 'disabled', disabled),
        bem.em('item', 'interactive', !disabled),
        className,
      )}
      onClick={handleClick}
    >
      {children ?? (
        <>
          {isImg ? (
            <Image className={bem.e('item-img')} src={icon as string} />
          ) : (
            <View
              className={bem.e('item-icon')}
              style={{
                color,
                backgroundColor: background,
              }}
            >
              <Icon size={24} {...(icon as IconProps)}></Icon>
            </View>
          )}
          {name && <View className={bem.e('item-name')}>{name}</View>}
          {label && <View className={bem.e('item-label')}>{label}</View>}
        </>
      )}
    </View>
  )
}

export default ShareSheetItem
