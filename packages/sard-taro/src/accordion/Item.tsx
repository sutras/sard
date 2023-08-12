import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { Icon } from '../icon'
import { Collapse } from '../collapse'
import { useBem } from '../use'
import { isFunction } from '../utils'

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
  later?: boolean
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
    later,
    ...restProps
  } = props

  const [bem] = useBem('accordion-item')

  const handleClick = (event: ITouchEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const active = Array.isArray(activeKey)
    ? activeKey.includes(innerKey)
    : innerKey === activeKey

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), bem.m('later', later), className)}
    >
      <View
        className={classNames(
          bem.e('header'),
          bem.em('header', 'disabled', disabled),
        )}
        onClick={handleClick}
      >
        <View className={bem.e('title')}>{title}</View>
        <View className={bem.e('icon')}>
          {isFunction(icon)
            ? icon(active)
            : icon ?? (
                <Icon
                  className={classNames(
                    bem.e('arrow'),
                    bem.em('arrow', 'active', active),
                  )}
                  prefix="sari"
                  name="down"
                ></Icon>
              )}
        </View>
      </View>
      <Collapse
        duration={duration}
        visible={active}
        className={bem.e('wrapper')}
      >
        <View className={bem.e('content')}>{children}</View>
      </Collapse>
    </View>
  )
}

export default AccordionItem
