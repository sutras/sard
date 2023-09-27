import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem, useEvent, useSelect } from '../use'
import Collapse from '../collapse'
import List from '../list'
import Halfline from '../halfline'

export interface AccordionItemProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  title?: ReactNode
  disabled?: boolean
  duration?: number
  arrow?: (expanded: boolean) => ReactNode
  expanded?: boolean
  defaultExpanded?: boolean
  onChange?: (expanded: boolean) => void
  _innerKey?: string | number
  _multiple?: boolean
}

export const AccordionItem: FC<AccordionItemProps> = (props) => {
  const {
    className,
    style,
    children,
    title,
    arrow,
    disabled,
    duration,
    expanded,
    defaultExpanded,
    onChange,
    _innerKey,
    _multiple,
    ...restProps
  } = props

  const [bem] = useBem('accordion')

  const [selected, toggle] = useSelect(
    _multiple ? 'multiple' : 'single',
    {
      value: expanded,
      defaultValue: defaultExpanded,
      trigger: onChange,
      initialValue: false,
      clearable: true,
    },
    _innerKey,
  )

  const handleClick = useEvent(() => {
    if (!disabled) {
      toggle()
    }
  })

  return (
    <View
      {...restProps}
      className={classNames(bem.e('item'), className)}
      style={style}
    >
      <List.Item
        linkable
        clickable={!disabled}
        title={title}
        arrowDirection={selected ? 'up' : 'down'}
        onClick={handleClick}
        bodyClass={bem.m('disabled', disabled)}
        footerClass={bem.m('disabled', disabled)}
        className={classNames(
          bem.e('item-header'),
          bem.em('item-header', 'disabled', disabled),
        )}
        arrow={arrow ? arrow(selected) : undefined}
      />
      <Collapse duration={duration} visible={selected}>
        <View className={bem.e('item-body')}>
          <Halfline direction="top" className={bem.e('halfline')} />
          {children}
        </View>
      </Collapse>
    </View>
  )
}

export default AccordionItem
