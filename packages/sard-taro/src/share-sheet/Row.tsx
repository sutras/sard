import { Children, FC, ReactElement, cloneElement } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { ShareSheetItem, ShareSheetItemProps } from './Item'
import { useBem } from '../use'

export interface ShareSheetRowProps extends BaseProps {
  itemList?: ShareSheetItemProps[]
  onItemClick?: (itemProps: ShareSheetItemProps) => void
}

export const ShareSheetRow: FC<ShareSheetRowProps> = (props) => {
  const { className, children, itemList, onItemClick, ...restProps } = props

  const [bem] = useBem('share-sheet')

  const rowclass = classNames(bem.e('row'), className)

  return (
    <View {...restProps} className={rowclass}>
      {itemList
        ? itemList.map((itemProps, index) => (
            <ShareSheetItem
              {...itemProps}
              key={index}
              onClick={(event) => {
                onItemClick?.(itemProps)
                itemProps.onClick?.(event)
              }}
            />
          ))
        : Children.map(
            children,
            (element: ReactElement<ShareSheetItemProps>) => {
              return cloneElement(element, {
                onClick: (event) => {
                  onItemClick?.(element.props)
                  element.props.onClick?.(event)
                },
              })
            },
          )}
    </View>
  )
}

export default ShareSheetRow
