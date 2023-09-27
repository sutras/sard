import { FC, ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import { Image, View, ITouchEvent } from '@tarojs/components'
import { Icon, IconProps } from '../icon'
import { filterNullish, isFileUrl, isNumber, isString } from '../utils'
import { BaseProps } from '../base'
import { useBem, useEvent } from '../use'
import Pressable from '../pressable'

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
    style,
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
    return isNumber(icon) || (isString(icon) && isFileUrl(icon))
  }, [icon])

  const handleClick = useEvent((event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  })

  return (
    <Pressable disabled={disabled}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.em('item', 'disabled', disabled),
            bem.em('item', 'pressed', pressed),
            className,
          )}
          style={style}
          onClick={handleClick}
        >
          {children ?? (
            <>
              <View
                className={bem.e('icon-wrapper')}
                style={filterNullish({
                  backgroundColor: background,
                })}
              >
                {isImg ? (
                  <Image
                    className={bem.e('img')}
                    mode="aspectFill"
                    src={icon as string}
                  />
                ) : (
                  <Icon
                    size={24}
                    {...(icon as IconProps)}
                    className={bem.e('icon')}
                    style={filterNullish({
                      color,
                    })}
                  />
                )}
              </View>
              {name && <View className={bem.e('item-name')}>{name}</View>}
              {label && <View className={bem.e('item-label')}>{label}</View>}
            </>
          )}
        </View>
      )}
    </Pressable>
  )
}

export default ShareSheetItem
