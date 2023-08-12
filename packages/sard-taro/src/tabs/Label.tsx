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
import { getRectById, isFunction } from '../utils'

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
  line?: ReactNode
  lineStyle?: CSSProperties
  lineClass?: string
  type?: 'line' | 'pill' | 'border'
  autoScroll?: boolean
  direction?: 'horizontal' | 'vertical'
  index?: number
  count?: number
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
      line,
      lineStyle,
      lineClass,
      type,
      autoScroll,
      direction,
      index,
      count,
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
          bem.em('label', `${type}-active`, active),
          bem.em('label', 'disabled', disabled),
          bem.em('label', 'pill-active', type === 'pill' && active),
          bem.em('label', 'auto', autoScroll),
          bem.em('label', direction),
          bem.em(
            'label',
            `${direction}-border-first`,
            type === 'border' && index === 0,
          ),
          bem.em(
            'label',
            `${direction}-border-later`,
            type === 'border' && index > 0,
          ),
          bem.em(
            'label',
            `${direction}-border-last`,
            type === 'border' && index === count - 1,
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
        <View
          className={classNames(
            bem.e('label-text'),
            bem.em('label-text', `${type}-active`, active),
          )}
        >
          {isFunction(children) ? children(active) : children}
        </View>
        {type === 'line' &&
          (line ?? (
            <View
              className={classNames(
                bem.e('label-line'),
                bem.em('label-line', direction),
                bem.em('label-line', `${direction}-active`, active),
                lineClass,
              )}
              style={lineStyle}
            ></View>
          ))}
      </View>
    )
  },
)

export default TabsLabel
