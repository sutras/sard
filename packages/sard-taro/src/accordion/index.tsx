import { ReactElement, Children, cloneElement, FC } from 'react'
import classNames from 'classnames'
import { useControllableValue } from '../use'

import { AccordionItem, AccordionItemProps } from './Item'
import { BaseProps } from '../base'
import { View } from '@tarojs/components'

export * from './Item'

interface AccordionBaseProps extends BaseProps {
  duration?: number
}

interface AccordionSingleProps<T = number | string> extends AccordionBaseProps {
  multiple?: false
  defaultActiveKey?: T
  activeKey?: T
  onChange?: (activeKey: T) => void
}

interface AccordionMultipleProps<T = (string | number)[]>
  extends AccordionBaseProps {
  multiple: true
  defaultActiveKey?: T
  activeKey?: T
  onChange?: (activeKey: T) => void
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

  const [innerActiveKey, setInnerActiveKey] = useControllableValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
    initialValue: () => (multiple ? [] : ''),
  })

  const handleItemClick = (innerKey: string | number) => {
    let key: AccordionProps['activeKey']
    if (Array.isArray(innerActiveKey)) {
      key = innerActiveKey.includes(innerKey)
        ? innerActiveKey.filter((item: string | number) => item !== innerKey)
        : [...innerActiveKey, innerKey]
    } else {
      key = innerKey !== innerActiveKey ? innerKey : ''
    }
    setInnerActiveKey(key)

    onChange?.(key as (string | number) & (string | number)[])
  }

  const accordionClass = classNames('sar-accordion', className)

  return (
    <View {...restProps} className={accordionClass}>
      {Children.map(
        children,
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
    </View>
  )
}

Accordion.Item = AccordionItem

export default Accordion
