import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import Loading, { LoadingProps } from '../loading'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem, useEvent } from '../use'
import Halfline from '../halfline'
import Pressable from '../pressable'

export interface ActionSheetItemProps extends BaseProps {
  name?: ReactNode
  description?: ReactNode
  color?: string
  loading?: boolean
  loadingProps?: LoadingProps
  disabled?: boolean
  onClick?: (event: ITouchEvent) => void
  _later?: boolean
}

export const ActionSheetItem: FC<ActionSheetItemProps> = (props) => {
  const {
    className,
    style,
    children,

    name,
    description,
    color,
    loading,
    loadingProps,
    disabled,
    onClick,
    _later,
    ...restProps
  } = props

  const [bem] = useBem('action-sheet')

  const handleClick = useEvent((event: ITouchEvent) => {
    if (!disabled && !loading) {
      onClick?.(event)
    }
  })

  return (
    <Pressable disabled={disabled || loading}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.em('item', 'disabled', disabled),
            bem.em('item', 'loading', loading),
            bem.m('pressed', pressed),
            className,
          )}
          style={{
            ...style,
            color,
          }}
          onClick={handleClick}
        >
          {loading ? (
            <Loading {...loadingProps} />
          ) : (
            <>
              {(!isNullish(name) || !isNullish(children)) && (
                <View
                  className={classNames(
                    bem.e('item-name'),
                    bem.m('disabled', disabled),
                  )}
                >
                  {name ?? children}
                </View>
              )}
              {!isNullish(description) && (
                <View
                  className={classNames(
                    bem.e('item-description'),
                    bem.m('disabled', disabled),
                  )}
                >
                  {description}
                </View>
              )}
            </>
          )}

          {_later && <Halfline direction="top" />}
        </View>
      )}
    </Pressable>
  )
}

export default ActionSheetItem
