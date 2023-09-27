import { Children, FC, ReactElement, cloneElement } from 'react'
import classNames from 'classnames'
import { ScrollView, View } from '@tarojs/components'
import { BaseProps } from '../base'
import { ShareSheetItem, ShareSheetItemProps } from './Item'
import { useBem } from '../use'
import Halfline from '../halfline'

export interface ShareSheetRowProps extends BaseProps {
  itemList?: ShareSheetItemProps[]
  _onItemClick?: (itemProps: ShareSheetItemProps) => void
  _later?: boolean
}

export const ShareSheetRow: FC<ShareSheetRowProps> = (props) => {
  const {
    className,
    style,
    children,

    itemList,
    _onItemClick,
    _later,
    ...restProps
  } = props

  const [bem] = useBem('share-sheet')

  return (
    <View
      {...restProps}
      className={classNames(bem.e('row'), className)}
      style={style}
    >
      <ScrollView scrollX showScrollbar={false}>
        <View className={bem.e('row-content')}>
          {itemList
            ? itemList.map((itemProps, index) => (
                <ShareSheetItem
                  {...itemProps}
                  key={index}
                  onClick={(event) => {
                    _onItemClick?.(itemProps)
                    itemProps.onClick?.(event)
                  }}
                />
              ))
            : Children.map(
                children,
                (element: ReactElement<ShareSheetItemProps>) => {
                  return cloneElement(element, {
                    onClick: (event) => {
                      _onItemClick?.(element.props)
                      element.props.onClick?.(event)
                    },
                  })
                },
              )}
        </View>
      </ScrollView>
      {_later && <Halfline direction="top" />}
    </View>
  )
}

export default ShareSheetRow
