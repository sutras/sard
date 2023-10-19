import { Children, FC, ReactElement, ReactNode, cloneElement } from 'react'
import { BaseProps } from '../base'
import { useSelectGroup, SelectContext } from '../use'
import { AccordionItem, AccordionItemProps } from './Item'
import List from '../list'
import CustomWrapper from '../custom-wrapper'

export * from './Item'

interface AccordionBaseProps extends BaseProps {
  duration?: number
  arrow?: (expanded: boolean) => ReactNode
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
    style,
    children,
    defaultActiveKey,
    activeKey,
    multiple = false,
    duration = 300,
    arrow,
    onChange,
    ...restProps
  } = props

  const context = useSelectGroup({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
    initialValue: () => (multiple ? [] : undefined),
  })

  return (
    <CustomWrapper>
      <SelectContext.Provider value={context}>
        <List {...restProps} className={className} style={style}>
          {Children.map(
            children,
            (element: ReactElement<AccordionItemProps>, index) => {
              const key = element.key ?? index
              return cloneElement(element, {
                _innerKey: key,
                _multiple: multiple,
                duration: element.props.duration ?? duration,
                arrow: element.props.arrow ?? arrow,
              })
            },
          )}
        </List>
      </SelectContext.Provider>
    </CustomWrapper>
  )
}

Accordion.Item = AccordionItem

export default Accordion
