import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { List } from '../list'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { Text } from '@tarojs/components'

export interface DropdownOptionProps extends Omit<BaseProps, 'children'> {
  label?: ReactNode
  value?: number | string
  active?: boolean
  onClick?: () => void
}

export const DropdownOption: FC<DropdownOptionProps> = (props) => {
  const { className, style, label, active, onClick, ...restProps } = props

  const [bem] = useBem('dropdown')

  return (
    <List.Item
      {...restProps}
      className={classNames(
        bem.e('option'),
        bem.em('option', 'active', active),
        className,
      )}
      style={style}
      title={
        <Text
          className={classNames(
            bem.e('option-label'),
            bem.em('option-label', 'active', active),
          )}
        >
          {label}
        </Text>
      }
      linkable
      arrow={
        <Icon
          name="success"
          className={classNames(
            bem.e('option-icon'),
            bem.em('option-icon', 'active', active),
          )}
        />
      }
      onClick={onClick}
    />
  )
}

export default DropdownOption
