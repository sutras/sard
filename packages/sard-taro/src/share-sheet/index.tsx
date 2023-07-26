import {
  ReactNode,
  FC,
  useMemo,
  ReactElement,
  cloneElement,
  Children,
} from 'react'
import classNames from 'classnames'
import { View, Button, ITouchEvent } from '@tarojs/components'
import { useEvent } from '../use'
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

  const shareSheetClass = classNames(
    'sar-share-sheet',
    {
      'sar-share-sheet-headless': !title && !description,
    },
    className,
  )

  return (
    <Popup
      {...restProps}
      visible={visible}
      effect="slide-bottom"
      className={shareSheetClass}
      onMaskClick={handleMaskClick}
    >
      {(!isNullish(title) || !isNullish(description)) && (
        <View className="sar-share-sheet-header">
          {!isNullish(title) && (
            <View className="sar-share-sheet-title">{title}</View>
          )}
          {!isNullish(description) && (
            <View className="sar-share-sheet-description">{description}</View>
          )}
        </View>
      )}
      <View className="sar-share-sheet-body">
        {rowList
          ? rowList.map((itemList, index) => (
              <ShareSheetRow
                itemList={itemList}
                key={index}
                onItemClick={(event) => {
                  handleItemClick(event)
                }}
              />
            ))
          : Children.map(
              children,
              (element: ReactElement<ShareSheetRowProps>) => {
                return cloneElement(element, {
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
          <View className="sar-share-sheet-gap"></View>
          <Button
            className="sar-share-sheet-cancel"
            onClick={handleCancelClick}
          >
            {cancel}
          </Button>
        </>
      )}
    </Popup>
  )
}) as ShareSheetFC

ShareSheet.Row = ShareSheetRow
ShareSheet.Item = ShareSheetItem

export default ShareSheet
