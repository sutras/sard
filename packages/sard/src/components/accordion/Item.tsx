import { CSSProperties, FC, ReactNode, MouseEvent } from 'react'
import classNames from 'classnames'
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
  onClick?: (event: MouseEvent) => void
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

  const handleClick = (event: MouseEvent) => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  const active = Array.isArray(activeKey)
    ? activeKey.includes(innerKey)
    : innerKey === activeKey

  const itemClass = classNames(
    's-accordion-item',
    {
      's-accordion-item-active': active,
      's-accordion-item-disabled': disabled,
    },
    className,
  )

  return (
    <div {...restProps} className={itemClass}>
      <div className="s-accordion-item-header" onClick={handleClick}>
        <div className="s-accordion-item-title">{title}</div>
        <div className="s-accordion-item-icon">
          {typeof icon === 'function'
            ? icon(active)
            : icon ?? (
                <Icon
                  className="s-accordion-item-arrow"
                  prefix="si"
                  name="down"
                ></Icon>
              )}
        </div>
      </div>
      <Collapse
        duration={duration}
        visible={active}
        className="s-accordion-item-wrapper"
      >
        <div className="s-accordion-item-content">{children}</div>
      </Collapse>
    </div>
  )
}

export default AccordionItem
