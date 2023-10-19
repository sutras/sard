import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon, IconProps } from '../icon'
import { BaseProps } from '../base'
import { isNullish } from '../utils'
import { useBem } from '../use'

export interface ResultProps extends BaseProps {
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  icon?: ReactNode
  iconProps?: IconProps
  title?: ReactNode
  description?: ReactNode
}

const mapStatusIcon = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'warning-fill',
  error: 'x-octagon-fill',
  question: 'question-circle-fill',
}

export const Result: FC<ResultProps> = (props) => {
  const {
    className,
    style,
    children,
    status = 'info',
    icon,
    iconProps,
    title,
    description,
    ...restProps
  } = props

  const [bem] = useBem('result')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={style}
    >
      {icon ?? (
        <Icon
          name={mapStatusIcon[status]}
          {...iconProps}
          className={classNames(bem.e('icon'), bem.em('icon', status))}
        />
      )}
      {!isNullish(title) && <View className={bem.e('title')}>{title}</View>}
      {!isNullish(description) && (
        <View className={bem.e('description')}>{description}</View>
      )}
      {!isNullish(children) && (
        <View className={bem.e('extra')}>{children}</View>
      )}
    </View>
  )
}

export default Result
