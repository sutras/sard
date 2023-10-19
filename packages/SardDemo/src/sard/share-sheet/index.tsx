import {
  ReactNode,
  FC,
  useMemo,
  ReactElement,
  cloneElement,
  Children,
} from 'react'
import classNames from 'classnames'
import { View, ITouchEvent } from '@tarojs/components'
import { useBem, useControllableValue, useEvent } from '../use'
import { Popup, PopupProps } from '../popup'
import { ShareSheetItem, ShareSheetItemProps } from './Item'
import { ShareSheetRow, ShareSheetRowProps } from './Row'
import { BaseProps } from '../base'
import { isFunction, isNullish, noop } from '../utils'
import Halfline from '../halfline'
import Pressable from '../pressable'
import SafeArea from '../safe-area'

export * from './Item'

export type ShareSheetItemList = ShareSheetItemProps[] | ShareSheetItemProps[][]

export interface ShareSheetProps extends BaseProps, PopupProps {
  itemList?: ShareSheetItemList
  title?: ReactNode
  description?: ReactNode
  cancel?: ReactNode
  onSelect?: (itemProps: ShareSheetItemProps) => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onClose?: () => void | Promise<any>
  maskClosable?: boolean
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
}

export interface ShareSheetFC extends FC<ShareSheetProps> {
  Row: typeof ShareSheetRow
  Item: typeof ShareSheetItem
}

export const ShareSheet: ShareSheetFC = ((props) => {
  const {
    className,
    style,
    children,

    itemList,
    title,
    description,
    cancel,
    onSelect,
    onCancel,
    onClose,
    maskClosable = true,
    onMaskClick,
    visible,
    defaultVisible,
    onVisible,
    ...restProps
  } = props

  const [bem] = useBem('share-sheet')

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: false,
  })

  const perhapsClose = (callback?: () => void | Promise<any>) => {
    if (isFunction(callback)) {
      const result = callback()
      if (result instanceof Promise) {
        return result
          .then(() => {
            setInnerVisible?.(false)
          })
          .catch(noop)
      }
    }

    setInnerVisible?.(false)
  }

  const handleItemClick = useEvent((itemProps: ShareSheetItemProps) => {
    perhapsClose(() => {
      return onSelect?.(itemProps)
    })
  })

  const handleRequestClose = useEvent(() => {
    setInnerVisible(false)
  })

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    onMaskClick?.(event)

    if (maskClosable) {
      perhapsClose(onClose)
    }
  })

  const handleCancelClick = useEvent(() => {
    perhapsClose(onCancel)
  })

  const rowList = useMemo(() => {
    if (itemList) {
      if (itemList.length && !Array.isArray(itemList[0])) {
        return [itemList]
      }
      return itemList
    }
  }, [itemList])

  return (
    <Popup
      {...restProps}
      visible={innerVisible}
      effect="slide-bottom"
      className={bem.e('popup')}
      style={style}
      contentClass={classNames(bem.b(), className)}
      onMaskClick={handleMaskClick}
      onRequestClose={handleRequestClose}
    >
      {(!isNullish(title) || !isNullish(description)) && (
        <View className={bem.e('header')}>
          {!isNullish(title) && <View className={bem.e('title')}>{title}</View>}
          {!isNullish(description) && (
            <View
              className={classNames(
                bem.e('description'),
                bem.em('description', 'titled', !isNullish(title)),
              )}
            >
              {description}
            </View>
          )}

          <Halfline direction="bottom" />
        </View>
      )}
      <View className={bem.e('body')}>
        {rowList
          ? rowList.map((itemList, index) => (
              <ShareSheetRow
                key={index}
                itemList={itemList}
                className={classNames(
                  bem.em(
                    'row',
                    'headless-first',
                    isNullish(title) && isNullish(description) && index === 0,
                  ),
                )}
                _onItemClick={(itemProps) => {
                  handleItemClick(itemProps)
                }}
                _later={index > 0}
              />
            ))
          : Children.map(
              children,
              (element: ReactElement<ShareSheetRowProps>, index) => {
                return cloneElement(element, {
                  _later: index > 0,
                  _onItemClick: (itemProps) => {
                    handleItemClick(itemProps)
                  },
                })
              },
            )}
      </View>
      {!isNullish(cancel) && (
        <>
          <View className={bem.e('gap')} />
          <Pressable>
            {({ pressed }) => (
              <View
                className={classNames(
                  bem.e('cancel'),
                  bem.em('cancel', 'pressed', pressed),
                )}
                onClick={handleCancelClick}
              >
                {cancel}
              </View>
            )}
          </Pressable>
        </>
      )}

      <SafeArea direction="bottom" />
    </Popup>
  )
}) as ShareSheetFC

ShareSheet.Row = ShareSheetRow
ShareSheet.Item = ShareSheetItem

export default ShareSheet
