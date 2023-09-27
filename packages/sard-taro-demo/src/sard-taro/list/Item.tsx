import { CSSProperties, FC, ReactNode, useContext } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { isNullish, pickContextNullish } from '../utils'
import { OrderContext } from './OrderContext'
import { ListContext } from './ListContext'
import Icon from '../icon'
import Halfline from '../halfline'
import Pressable from '../pressable'

export interface ListItemProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  value?: ReactNode
  footer?: ReactNode
  linkable?: boolean
  clickable?: boolean
  arrowDirection?: 'up' | 'right' | 'down'
  arrow?: ReactNode
  icon?: ReactNode
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
  onClick?: (event: ITouchEvent) => void
}

export const ListItem: FC<ListItemProps> = (props) => {
  const {
    className,
    style,
    children,

    title,
    label,
    value,
    footer,
    linkable,
    clickable,
    arrowDirection = 'right',
    arrow,
    icon,
    inset,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('list')

  const { index, count, card } = useContext(OrderContext)

  const listContext = useContext(ListContext)
  const contextProps = pickContextNullish(
    {
      inset,
      bodyStyle,
      bodyClass,
      footerStyle,
      footerClass,
    },
    listContext,
  )

  return (
    <Pressable disabled={!clickable && (clickable === false || !linkable)}>
      {({ pressed }) => (
        <View
          {...restProps}
          className={classNames(
            bem.e('item'),
            bem.em('item', 'first', index === 0),
            bem.em('item', 'first-card', index === 0 && card),
            bem.em('item', 'last', index === count - 1),
            bem.em('item', 'last-card', index === count - 1 && card),
            bem.em('item', 'pressed', pressed),
            bem.em(
              'item',
              'clickable',
              clickable || (clickable !== false && linkable),
            ),
            className,
          )}
          style={style}
          onClick={onClick}
        >
          {!isNullish(icon) && (
            <View
              className={classNames(
                bem.e('item-header'),
                bem.em(
                  'item-header',
                  'inset-later',
                  contextProps.inset && index > 0,
                ),
              )}
            >
              <View className={bem.e('icon')}>{icon}</View>
              {contextProps.inset && index > 0 && <Halfline direction="top" />}
            </View>
          )}
          <View
            className={classNames(
              bem.e('item-content'),
              bem.em('item-content', 'custom', !!children),
              bem.em('item-content', 'later', index > 0),
            )}
          >
            {index > 0 && <Halfline direction="top" />}
            {children ?? (
              <>
                <View
                  className={classNames(
                    bem.e('item-body'),
                    contextProps.bodyClass,
                  )}
                  style={contextProps.bodyStyle}
                >
                  {!isNullish(title) && (
                    <View className={classNames(bem.e('item-title'))}>
                      {title}
                    </View>
                  )}
                  {!isNullish(label) && (
                    <View className={bem.e('item-label')}>{label}</View>
                  )}
                </View>
                <View
                  className={classNames(
                    bem.e('item-footer'),
                    bem.em('item-footer', 'custom', !isNullish(footer)),
                    contextProps.footerClass,
                  )}
                  style={contextProps.footerStyle}
                >
                  {footer ?? (
                    <>
                      {!isNullish(value) && (
                        <View className={bem.e('item-value')}>{value}</View>
                      )}
                      {linkable && (
                        <View className={bem.e('item-arrow')}>
                          {arrow ?? (
                            <Icon
                              name={arrowDirection}
                              className={bem.e('item-arrow-icon')}
                            />
                          )}
                        </View>
                      )}
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default ListItem
