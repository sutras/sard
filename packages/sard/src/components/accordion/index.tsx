import {
  CSSProperties,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
  FC,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'

import { AccordionItem, AccordionItemProps } from './Item'

export * from './Item'

interface AccordionBaseProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  duration?: number
}

interface AccordionSingleProps extends AccordionBaseProps {
  multiple?: false
  defaultActiveKey?: string | number
  activeKey?: string | number
  onChange?: (activeKey: string | number) => void
}

interface AccordionMultipleProps extends AccordionBaseProps {
  multiple?: true
  defaultActiveKey?: (string | number)[]
  activeKey?: (string | number)[]
  onChange?: (activeKey: (string | number)[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

export interface AccordionFC extends FC<AccordionProps> {
  Item: typeof AccordionItem
}

export const Accordion: AccordionFC = (props) => {
  const {
    className,
    children,
    defaultActiveKey,
    activeKey,
    multiple = false,
    duration,
    onChange,
    ...restProps
  } = props

  const [innerActiveKey, setInnerActiveKey] = useControlledValue<
    (string | number)[] | string | number
  >(props, {
    defaultValuePropName: 'defaultActiveKey',
    valuePropName: 'activeKey',
    defaultValue: multiple ? [] : '',
  })

  const handleItemClick = (innerKey: string | number) => {
    let key: any
    if (Array.isArray(innerActiveKey)) {
      key = innerActiveKey.includes(innerKey)
        ? innerActiveKey.filter((item: string | number) => item !== innerKey)
        : [...innerActiveKey, innerKey]
    } else {
      key = innerKey !== innerActiveKey ? innerKey : ''
    }
    setInnerActiveKey(key)

    onChange?.(key)
  }

  const accordionClass = classNames('s-accordion', className)

  return (
    <div {...restProps} className={accordionClass}>
      {Children.map(
        children as ReactElement<AccordionItemProps>,
        (item: ReactElement<AccordionItemProps>, index: number) => {
          const innerKey = item.key ?? index
          return cloneElement(item, {
            innerKey,
            activeKey: innerActiveKey,
            duration: item.props.duration ?? duration,
            onClick: () => handleItemClick(innerKey),
          })
        },
      )}
    </div>
  )
}

Accordion.Item = AccordionItem

export default Accordion
