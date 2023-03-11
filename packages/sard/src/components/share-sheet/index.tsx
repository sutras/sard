import { ReactNode, CSSProperties, FC, MouseEvent } from 'react'
import classNames from 'classnames'
import { useEvent } from '../../use'
import { Popup, PopupProps } from '../popup'
import { ShareSheetItem, ShareSheetItemProps } from './Item'

export * from './Item'

export type ShareSheetItemList = ShareSheetItemProps[] | ShareSheetItemProps[][]

export interface ShareSheetProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  itemList?: ShareSheetItemList
  visible?: boolean
  title?: ReactNode
  description?: ReactNode
  cancel?: ReactNode
  maskClosable?: boolean
  actionClosable?: boolean
  onSelect?: (itemProps: ShareSheetItemProps, index: number) => void
  onCancel?: (visible: false) => void
  onClose?: (visible: false) => void
  popupProps?: PopupProps
}

export interface ShareSheetFC extends FC<ShareSheetProps> {
  Item: typeof ShareSheetItem
}

export const ShareSheet: ShareSheetFC = ((props) => {
  const {
    className,
    children,
    itemList = [],
    visible,
    title,
    description,
    cancel,
    maskClosable = true,
    actionClosable,
    onSelect,
    onCancel,
    onClose,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'bottom', ...restPopupProps } = popupProps

  const handleItemClick = useEvent(
    (itemProps: ShareSheetItemProps, index: number) => {
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

  const shareSheetClass = classNames(
    's-share-sheet',
    {
      's-share-sheet-headless': !title && !description,
    },
    className,
  )

  const row = (list: ShareSheetItemProps[], index?: number) => {
    return (
      <div className="s-share-sheet-row" key={index}>
        {list.map((itemProps, index) => (
          <ShareSheetItem
            {...itemProps}
            key={index}
            onClick={(event) => {
              handleItemClick(itemProps, index)
              itemProps.onClick?.(event)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <Popup
      {...restPopupProps}
      visible={visible}
      placement={placement}
      onMaskClick={handleMaskClick}
    >
      <div {...restProps} className={shareSheetClass}>
        {(title || description) && (
          <div className="s-share-sheet-header">
            {title && <div className="s-share-sheet-title">{title}</div>}
            {description && (
              <div className="s-share-sheet-description">{description}</div>
            )}
          </div>
        )}
        <div className="s-share-sheet-body">
          {children ||
            (itemList.length && Array.isArray(itemList[0])
              ? itemList.map((list, index) => row(list, index))
              : row(itemList as ShareSheetItemProps[]))}
        </div>
        {cancel && (
          <>
            <div className="s-share-sheet-gap"></div>
            <button
              className="s-share-sheet-cancel"
              onClick={handleCancelClick}
            >
              {cancel}
            </button>
          </>
        )}
      </div>
    </Popup>
  )
}) as ShareSheetFC

ShareSheet.Item = ShareSheetItem

export default ShareSheet
