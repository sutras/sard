import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { Popup, PopupProps } from '../popup'
import { ActionSheetItem, ActionSheetItemProps } from './Item'

export type { ActionSheetItemProps } from './Item'

export interface ActionSheetProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
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
  popupProps?: PopupProps
}

export interface ActionSheetFC extends FC<ActionSheetProps> {}

export const ActionSheet: ActionSheetFC = (props) => {
  const {
    className,
    children,
    visible,
    maskClosable = true,
    actionClosable,
    title,
    description,
    itemList = [],
    cancel,
    onSelect,
    onCancel,
    onClose,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'bottom', ...restPopupProps } = popupProps

  const handleItemClick = useEvent(
    (itemProps: ActionSheetItemProps, index: number) => {
      onSelect?.(itemProps, index)
      if (actionClosable) {
        onClose?.(false)
      }
    },
  )

  const handleMaskClick = useEvent((event: MouseEvent) => {
    if (maskClosable) {
      popupProps?.onMaskClick?.(event)
      onClose?.(false)
    }
  })

  const handleCancelClick = useEvent(() => {
    onCancel?.(false)
    onClose?.(false)
  })

  const actionSheetClass = classNames(
    's-action-sheet',
    {
      's-action-sheet-headless': !title && !description,
    },
    className,
  )

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      onMaskClick={handleMaskClick}
    >
      <div {...restProps} className={actionSheetClass}>
        {(title || description) && (
          <div className="s-action-sheet-header">
            {title && <div className="s-action-sheet-title">{title}</div>}
            {description && (
              <div className="s-action-sheet-description">{description}</div>
            )}
          </div>
        )}
        <div className="s-action-sheet-body">
          {children ||
            itemList.map((itemProps, index) => (
              <ActionSheetItem
                {...itemProps}
                key={index}
                onClick={(event) => {
                  handleItemClick(itemProps, index)
                  itemProps.onClick?.(event)
                }}
              />
            ))}
        </div>
        {cancel && (
          <>
            <div className="s-action-sheet-gap"></div>
            <div className="s-action-sheet-cancel" onClick={handleCancelClick}>
              {cancel}
            </div>
          </>
        )}
      </div>
    </Popup>
  )
}

export default ActionSheet
