import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Icon } from '../icon'
import { Cell } from '../cell'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface DropdownOptionProps extends Omit<BaseProps, 'children'> {
  label?: ReactNode
  value?: number | string
  active?: boolean
  onClick?: () => void
}

export const DropdownOption: FC<DropdownOptionProps> = (props) => {
  const { className, label, active, onClick, ...restProps } = props

  const [bem] = useBem('dropdown')

  return (
    <Cell
      {...restProps}
      className={classNames(
        bem.e('option'),
        bem.em('option', 'active', active),
        className,
      )}
      title={label}
      linkable
      arrow={
        <View
          className={classNames(
            bem.e('option-icon'),
            bem.em('option-icon', 'active', active),
          )}
        >
          <Icon name="success"></Icon>
        </View>
      }
      onClick={onClick}
    ></Cell>
  )
}

export default DropdownOption
