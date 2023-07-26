import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Icon } from '../icon'
import { Collapse } from '../collapse'

export interface AccordionItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  icon?: ReactNode | ((active: boolean) => ReactNode)
  innerKey?: string | number
  activeKey?: string | number | (string | number)[]
  disabled?: boolean
  duration?: number
  onClick?: (event: ITouchEvent) => void
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    className,
    children,
    title,
    icon,
    innerKey,
    activeKey,
    disabled,
    duration = 300,
    onClick,
    ...restProps
  } = props

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const active = Array.isArray(activeKey)
    ? activeKey.includes(innerKey)
    : innerKey === activeKey

  const itemClass = classNames(
    'sar-accordion-item',
    {
      'sar-accordion-item-active': active,
      'sar-accordion-item-disabled': disabled,
    },
    className,
  )

  return (
    <View {...restProps} className={itemClass}>
      <View className="sar-accordion-item-header" onClick={handleClick}>
        <View className="sar-accordion-item-title">{title}</View>
        <View className="sar-accordion-item-icon">
          {typeof icon === 'function'
            ? icon(active)
            : icon ?? (
                <Icon
                  className="sar-accordion-item-arrow"
                  prefix="sari"
                  name="down"
                ></Icon>
              )}
        </View>
      </View>
      <Collapse
        duration={duration}
        visible={active}
        className="sar-accordion-item-wrapper"
      >
        <View className="sar-accordion-item-content">{children}</View>
      </Collapse>
    </View>
  )
}

export default AccordionItem
