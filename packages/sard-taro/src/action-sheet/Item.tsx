import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { LoadingProps } from '../loading'
import Loading from '../loading'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem } from '../use'

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

  const [bem] = useBem('action-sheet')

  const handleClick = (event: ITouchEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  }

  const actionSheetItemClass = classNames(
    bem.e('item'),
    bem.em('item', 'disabled', disabled),
    bem.em('item', 'loading', loading),
    bem.em('item', 'interactive', !disabled && !loading),
    className,
  )

  const actionSheetItemStyle = {
    color,
    ...style,
  }

  return (
    <View
      {...restProps}
      className={actionSheetItemClass}
      style={actionSheetItemStyle}
      onClick={handleClick}
    >
      {loading ? (
        <Loading {...loadingProps}></Loading>
      ) : (
        <>
          {(!isNullish(title) || !isNullish(children)) && (
            <View className={bem.e('item-title')}>{title ?? children}</View>
          )}
          {!isNullish(label) && (
            <View className={bem.e('item-label')}>{label}</View>
          )}
        </>
      )}
    </View>
  )
}

export default ActionSheetItem
