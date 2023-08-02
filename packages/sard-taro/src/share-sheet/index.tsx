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
import { useBem, useEvent } from '../use'
import { Popup, PopupProps } from '../popup'
import { ShareSheetItem, ShareSheetItemProps } from './Item'
import { ShareSheetRow, ShareSheetRowProps } from './Row'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export * from './Item'

export type ShareSheetItemList = ShareSheetItemProps[] | ShareSheetItemProps[][]

export interface ShareSheetProps extends BaseProps, PopupProps {
  itemList?: ShareSheetItemList
  visible?: boolean
  title?: ReactNode
  description?: ReactNode
  cancel?: ReactNode
  maskClosable?: boolean
  actionClosable?: boolean
  onSelect?: (itemProps: ShareSheetItemProps) => void
  onCancel?: (visible: false) => void
  onClose?: (visible: false) => void
}

export interface ShareSheetFC extends FC<ShareSheetProps> {
  Row: typeof ShareSheetRow
  Item: typeof ShareSheetItem
}

export const ShareSheet: ShareSheetFC = ((props) => {
  const {
    className,
    children,
    itemList,
    visible,
    title,
    description,
    cancel,
    maskClosable = true,
    actionClosable,
    onSelect,
    onCancel,
    onClose,
    onMaskClick,
    ...restProps
  } = props

  const [bem] = useBem('share-sheet')

  const handleItemClick = useEvent((itemProps: ShareSheetItemProps) => {
    onSelect?.(itemProps)
    if (actionClosable) {
      onClose?.(false)
    }
  })

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    if (maskClosable) {
      onMaskClick?.(event)
      onClose?.(false)
    }
  })

  const handleCancelClick = useEvent(() => {
    onCancel?.(false)
    onClose?.(false)
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
      visible={visible}
      effect="slide-bottom"
      className={classNames(bem.b(), className)}
      onMaskClick={handleMaskClick}
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
        </View>
      )}
      <View className={bem.e('body')}>
        {rowList
          ? rowList.map((itemList, index) => (
              <ShareSheetRow
                itemList={itemList}
                key={index}
                className={classNames(
                  bem.em('row', 'later', index > 0),
                  bem.em(
                    'row',
                    'headless-first',
                    isNullish(title) && isNullish(description) && index === 0,
                  ),
                )}
                onItemClick={(event) => {
                  handleItemClick(event)
                }}
              />
            ))
          : Children.map(
              children,
              (element: ReactElement<ShareSheetRowProps>, index) => {
                return cloneElement(element, {
                  className: bem.em('row', 'later', index > 0),
                  onItemClick: (event) => {
                    handleItemClick(event)
                    element.props.onItemClick?.(event)
                  },
                })
              },
            )}
      </View>
      {!isNullish(cancel) && (
        <>
          <View className={bem.e('gap')}></View>
          <View className={bem.e('cancel')} onClick={handleCancelClick}>
            {cancel}
          </View>
        </>
      )}
    </Popup>
  )
}) as ShareSheetFC

ShareSheet.Row = ShareSheetRow
ShareSheet.Item = ShareSheetItem

export default ShareSheet
