import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export interface EmptyProps extends BaseProps {
  icon?: ReactNode
  iconProps?: IconProps
  description?: ReactNode
}

export const Empty: FC<EmptyProps> = (props) => {
  const [t] = useTranslate('empty')

  const {
    className,
    children,
    icon,
    iconProps,
    description = t('noData'),
    ...restProps
  } = props

  const emptyClass = classNames('sar-empty', className)

  return (
    <View {...restProps} className={emptyClass}>
      <View className="sar-empty-icon">
        {icon ?? <Icon name="empty" {...iconProps}></Icon>}
      </View>
      {!isNullish(description) && (
        <View className="sar-empty-description">{description}</View>
      )}
      {!isNullish(children) && (
        <View className="sar-empty-extra">{children}</View>
      )}
    </View>
  )
}

export default Empty
