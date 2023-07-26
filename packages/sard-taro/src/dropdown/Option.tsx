import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { Icon } from '../icon'
import { Cell } from '../cell'
import { BaseProps } from '../base'

export interface DropdownOptionProps extends Omit<BaseProps, 'children'> {
  label?: ReactNode
  value?: number | string
  active?: boolean
  onClick?: () => void
}

export const DropdownOption: FC<DropdownOptionProps> = (props) => {
  const { className, label, active, onClick, ...restProps } = props

  const optionClass = classNames(
    'sar-dropdown-option',
    {
      'sar-dropdown-item-option-active': active,
    },
    className,
  )

  return (
    <Cell
      {...restProps}
      className={optionClass}
      title={label}
      isLink
      arrow={
        <View className="sar-dropdown-option-icon">
          <Icon name="success"></Icon>
        </View>
      }
      onClick={onClick}
    ></Cell>
  )
}

export default DropdownOption
