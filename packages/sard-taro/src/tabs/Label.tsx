import {
  CSSProperties,
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useBem, useSelectorId } from '../use'
import { getRectById } from '../utils'

export interface TabLabelProps extends Omit<BaseProps, 'children'> {
  activeStyle?: CSSProperties
  activeClass?: string
  inactiveStyle?: CSSProperties
  inactiveClass?: string
  children?: ReactNode | ((active: boolean) => ReactNode)
  innerKey: number | string
  activeKey?: number | string
  onClick?: (innerKey: number | string) => void
  disabled?: boolean
  showLine?: boolean
  line?: ReactNode
  lineWidth?: string
  lineStyle?: CSSProperties
  lineClass?: string
  type?: 'inkbar' | 'card' | 'pill' | 'border'
  later?: boolean
  autoScroll?: boolean
  vertical?: boolean
}

export interface TabLabelRef {
  getFields: () => Promise<Record<string, number>>
}

export const TabsLabel = forwardRef<TabLabelRef, TabLabelProps>(
  (props, ref) => {
    const {
      className,
      style,
      activeStyle,
      activeClass,
      inactiveStyle,
      inactiveClass,
      children,
      innerKey,
      activeKey,
      onClick,
      disabled,
      showLine,
      line,
      lineWidth,
      lineStyle,
      lineClass,
      type,
      later,
      autoScroll,
      vertical,
      ...restProps
    } = props

    const [bem] = useBem('tabs')

    const selectorId = useSelectorId()

    const active = innerKey === activeKey

    const handleClick = () => {
      if (!disabled) {
        onClick?.(innerKey)
      }
    }

    useImperativeHandle(ref, () => ({
      getFields() {
        return getRectById(selectorId)
      },
    }))

    return (
      <View
        {...restProps}
        ref={ref}
        className={classNames(
          bem.e('label'),
          bem.em('label', type),
          bem.em('label', 'active', active),
          bem.em('label', 'border-active', type === 'border' && active),
          bem.em('label', 'disabled', disabled),
          bem.em('label', 'border-later', type === 'border' && later),
          bem.em('label', 'pill-active', type === 'pill' && active),
          bem.em('label', 'auto', autoScroll),
          bem.em('label', 'vertical', vertical),
          bem.em(
            'label',
            'vertical-border-later',
            vertical && type === 'border' && later,
          ),
          {
            [activeClass]: activeClass && active,
            [inactiveClass]: inactiveClass && !active,
          },
          className,
        )}
        style={{
          ...style,
          ...(active ? activeStyle : null),
          ...(!active ? inactiveStyle : null),
        }}
        onClick={handleClick}
        id={selectorId}
      >
        {showLine &&
          (line ?? (
            <View
              className={classNames(
                bem.e('label-line'),
                bem.em('label-line', type),
                bem.em('label-line', 'vertical', vertical),
                bem.em(
                  'label-line',
                  'vertical-card',
                  vertical && type === 'card',
                ),
                lineClass,
              )}
              style={{
                width: lineWidth,
                display: type === 'card' && !active ? 'none' : 'flex',
                ...lineStyle,
              }}
            ></View>
          ))}
        <View
          className={classNames(
            bem.e('label-text'),
            bem.em('label-text', 'border-active', type === 'border' && active),
            bem.em('label-text', 'pill-active', type === 'pill' && active),
          )}
        >
          {typeof children === 'function' ? children(active) : children}
        </View>
      </View>
    )
  },
)

export default TabsLabel
