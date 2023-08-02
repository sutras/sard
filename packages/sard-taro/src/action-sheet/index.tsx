import { Children, FC, ReactElement, ReactNode, cloneElement } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem, useEvent } from '../use'
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

  const [bem] = useBem('action-sheet')

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

  return (
    <Popup
      {...restProps}
      visible={visible}
      effect="slide-bottom"
      className={classNames(
        bem.b(),
        bem.m('headless', isNullish(title) && isNullish(description)),
        className,
      )}
      onMaskClick={handleMaskClick}
    >
      {(!isNullish(title) || !isNullish(description)) && (
        <View className={bem.e('header')}>
          {!isNullish(title) && <View className={bem.e('title')}>{title}</View>}
          {!isNullish(description) && (
            <View
              className={classNames(
                bem.e('description'),
                bem.em('description', 'has-title', !isNullish(title)),
              )}
            >
              {description}
            </View>
          )}
        </View>
      )}
      <View className={bem.e('body')}>
        {itemList
          ? itemList.map((itemProps, index) => (
              <ActionSheetItem
                {...itemProps}
                key={index}
                className={classNames(
                  bem.em(
                    'item',
                    'headless-first',
                    isNullish(title) && isNullish(description) && index === 0,
                  ),
                  bem.em('item', 'later', index > 0),
                )}
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
                  className: classNames(
                    bem.em(
                      'item',
                      'headless-first',
                      isNullish(title) && isNullish(description) && index === 0,
                    ),
                    bem.em('item', 'later', index > 0),
                  ),
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
          <View className={bem.e('gap')}></View>
          <View className={bem.e('cancel')} onClick={handleCancelClick}>
            {cancel}
          </View>
        </>
      )}
    </Popup>
  )
}

ActionSheet.Item = ActionSheetItem

export default ActionSheet
