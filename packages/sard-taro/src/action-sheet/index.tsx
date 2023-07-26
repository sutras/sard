import { Children, FC, ReactElement, ReactNode, cloneElement } from 'react'
import classNames from 'classnames'
import { Button, ITouchEvent, View } from '@tarojs/components'
import { useEvent } from '../use'
import { Popup, PopupProps } from '../popup'
import { ActionSheetItem, ActionSheetItemProps } from './Item'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export type { ActionSheetItemProps } from './Item'

export interface ActionSheetProps extends BaseProps, PopupProps {
  visible?: boolean
  maskClosable?: boolean
  actionClosable?: boolean
  title?: ReactNode
  description?: ReactNode
  itemList?: ActionSheetItemProps[]
  cancel?: ReactNode
  onSelect?: (itemProps: ActionSheetItemProps, index: number) => void
  onCancel?: (visible: false) => void
  onClose?: (visible: false) => void
}

export interface ActionSheetFC extends FC<ActionSheetProps> {
  Item: typeof ActionSheetItem
}

export const ActionSheet: ActionSheetFC = (props) => {
  const {
    className,
    children,
    visible,
    maskClosable = true,
    actionClosable,
    title,
    description,
    itemList,
    cancel,
    onSelect,
    onCancel,
    onClose,
    onMaskClick,
    ...restProps
  } = props

  const handleItemClick = useEvent(
    (itemProps: ActionSheetItemProps, index: number) => {
      onSelect?.(itemProps, index)
      if (actionClosable) {
        onClose?.(false)
      }
    },
  )

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

  const actionSheetClass = classNames(
    'sar-action-sheet',
    {
      'sar-action-sheet-headless': !title && !description,
    },
    className,
  )

  return (
    <Popup
      {...restProps}
      visible={visible}
      effect="slide-bottom"
      className={actionSheetClass}
      onMaskClick={handleMaskClick}
    >
      {(!isNullish(title) || !isNullish(description)) && (
        <View className="sar-action-sheet-header">
          {!isNullish(title) && (
            <View className="sar-action-sheet-title">{title}</View>
          )}
          {!isNullish(description) && (
            <View className="sar-action-sheet-description">{description}</View>
          )}
        </View>
      )}
      <View className="sar-action-sheet-body">
        {itemList
          ? itemList.map((itemProps, index) => (
              <ActionSheetItem
                {...itemProps}
                key={index}
                onClick={(event) => {
                  handleItemClick(itemProps, index)
                  itemProps.onClick?.(event)
                }}
              />
            ))
          : Children.map(
              children,
              (element: ReactElement<ActionSheetItemProps>, index) => {
                return cloneElement(element, {
                  onClick: (event) => {
                    handleItemClick(element.props, index)
                    element.props.onClick?.(event)
                  },
                })
              },
            )}
      </View>
      {!isNullish(cancel) && (
        <>
          <View className="sar-action-sheet-gap"></View>
          <Button
            className="sar-action-sheet-cancel"
            onClick={handleCancelClick}
          >
            {cancel}
          </Button>
        </>
      )}
    </Popup>
  )
}

ActionSheet.Item = ActionSheetItem

export default ActionSheet
