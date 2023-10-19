import {
  Children,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactElement,
  ReactNode,
  RefAttributes,
  cloneElement,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { useBem, useControllableValue, useEvent } from '../use'
import { Popup, PopupProps } from '../popup'
import { ActionSheetItem, ActionSheetItemProps } from './Item'
import { BaseProps } from '../base'
import { isFunction, isNullish, isString, noop } from '../utils'
import Halfline from '../halfline'
import Pressable from '../pressable'
import SafeArea from '../safe-area'

export type { ActionSheetItemProps } from './Item'

export interface ActionSheetProps extends BaseProps, PopupProps {
  description?: ReactNode
  itemList?: (string | ActionSheetItemProps)[]
  cancel?: ReactNode
  onSelect?: (
    index: number,
    item: string | ActionSheetItemProps,
  ) => void | Promise<any>
  onCancel?: () => void | Promise<any>
  onClose?: () => void | Promise<any>
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  maskClosable?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActionSheetRef {}

export interface ActionSheetFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<ActionSheetProps> & RefAttributes<ActionSheetRef>
  > {
  Item: typeof ActionSheetItem
}

export const ActionSheet: ActionSheetFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    contentClass,
    contentStyle,
    children,
    onMaskClick,

    description,
    itemList,
    cancel,
    onSelect,
    onCancel,
    onClose,
    visible,
    defaultVisible,
    onVisible,
    maskClosable = true,
    ...restProps
  } = props

  const [bem] = useBem('action-sheet')

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

  const handleItemClick = useEvent(
    (index: number, item: string | ActionSheetItemProps) => {
      perhapsClose(() => {
        return onSelect?.(index, item)
      })
    },
  )

  const handleMaskClick = useEvent((event: ITouchEvent) => {
    onMaskClick?.(event)

    if (maskClosable) {
      perhapsClose(onClose)
    }
  })

  const handleRequestClose = useEvent(() => {
    setInnerVisible(false)
  })

  const handleCancelClick = useEvent(() => {
    perhapsClose(onCancel)
  })

  useImperativeHandle(ref, () => ({}), [])

  return (
    <Popup
      {...(restProps as any)}
      visible={innerVisible}
      effect="slide-bottom"
      className={className}
      style={style}
      contentClass={classNames(
        bem.b(),
        bem.m('headless', isNullish(description)),
        contentClass,
      )}
      contentStyle={contentStyle}
      onMaskClick={handleMaskClick}
      catchMove
      onRequestClose={handleRequestClose}
    >
      {!isNullish(description) && (
        <View className={bem.e('header')}>
          <View className={bem.e('description')}>{description}</View>
          <Halfline direction="bottom" />
        </View>
      )}
      <View className={bem.e('body')}>
        {itemList
          ? itemList.map((item, index) => {
              const itemProps = isString(item)
                ? {
                    name: item,
                  }
                : item
              return (
                <ActionSheetItem
                  {...itemProps}
                  key={index}
                  _later={index > 0}
                  className={classNames(
                    bem.em(
                      'item',
                      'headless-first',
                      isNullish(description) && index === 0,
                    ),
                  )}
                  onClick={(event) => {
                    handleItemClick(index, item)
                    if (!isString(item)) {
                      item.onClick?.(event)
                    }
                  }}
                />
              )
            })
          : Children.map(
              children,
              (element: ReactElement<ActionSheetItemProps>, index) => {
                return cloneElement(element, {
                  className: classNames(
                    bem.em(
                      'item',
                      'headless-first',
                      isNullish(description) && index === 0,
                    ),
                  ),
                  _later: index > 0,
                  onClick: (event) => {
                    handleItemClick(index, element.props)
                    element.props.onClick?.(event)
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
                  bem.m('pressed', pressed),
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
}) as ActionSheetFC

ActionSheet.Item = ActionSheetItem

export default ActionSheet
