import {
  CSSProperties,
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { useSelectorId } from '../use'
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
      ...restProps
    } = props

    const selectorId = useSelectorId()

    const active = innerKey === activeKey

    const handleClick = () => {
      if (!disabled) {
        onClick?.(innerKey)
      }
    }

    const labelClass = classNames(
      'sar-tabs-label',
      {
        'sar-tabs-label-active': active,
        'sar-tabs-label-disabled': disabled,
        [activeClass]: activeClass && active,
        [inactiveClass]: inactiveClass && !active,
      },
      className,
    )

    const labelStyle = {
      ...style,
      ...(active ? activeStyle : null),
      ...(!active ? inactiveStyle : null),
    }

    useImperativeHandle(ref, () => ({
      getFields() {
        return getRectById(selectorId, { size: true, rect: true })
      },
    }))

    return (
      <View
        {...restProps}
        ref={ref}
        className={labelClass}
        style={labelStyle}
        onClick={handleClick}
        id={selectorId}
      >
        {showLine &&
          (line ?? (
            <View
              className={classNames('sar-tabs-label-line', lineClass)}
              style={{ width: lineWidth, ...lineStyle }}
            ></View>
          ))}
        <View className="sar-tabs-label-text">
          {typeof children === 'function' ? children(active) : children}
        </View>
      </View>
    )
  },
)

export default TabsLabel
