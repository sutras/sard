import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import useTranslate from '../locale/useTranslate'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem } from '../use'

export interface EmptyProps extends BaseProps {
  icon?: ReactNode
  iconProps?: IconProps
  description?: ReactNode
}

export const Empty: FC<EmptyProps> = (props) => {
  const { t } = useTranslate('empty')

  const {
    className,
    style,
    children,

    icon,
    iconProps,
    description = t('noData'),
    ...restProps
  } = props

  const [bem] = useBem('empty')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      <View className={bem.e('icon-wrapper')}>
        {icon ?? <Icon name="empty" className={bem.e('icon')} {...iconProps} />}
      </View>
      {!isNullish(description) && (
        <View className={bem.e('description')}>{description}</View>
      )}
      {!isNullish(children) && (
        <View className={bem.e('extra')}>{children}</View>
      )}
    </View>
  )
}

export default Empty
