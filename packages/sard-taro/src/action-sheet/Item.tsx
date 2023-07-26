import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Button, ITouchEvent, View } from '@tarojs/components'
import { LoadingProps } from '../loading'
import Loading from '../loading'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export interface ActionSheetItemProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  color?: string
  loading?: boolean
  loadingProps?: LoadingProps
  disabled?: boolean
  onClick?: (event: ITouchEvent) => void
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

  const handleClick = (event: ITouchEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  }

  const actionSheetItemClass = classNames(
    'sar-action-sheet-item',
    {
      'sar-action-sheet-item-disabled': disabled,
      'sar-action-sheet-item-loading': loading,
    },
    className,
  )

  const actionSheetItemStyle = {
    color,
    ...style,
  }

  return (
    <Button
      {...restProps}
      className={actionSheetItemClass}
      style={actionSheetItemStyle}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loading {...loadingProps}></Loading>
      ) : (
        <>
          {(!isNullish(title) || !isNullish(children)) && (
            <View className="sar-action-sheet-item-title">
              {title ?? children}
            </View>
          )}
          {!isNullish(label) && (
            <View className="sar-action-sheet-item-label">{label}</View>
          )}
        </>
      )}
    </Button>
  )
}

export default ActionSheetItem
