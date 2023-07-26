import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { Icon } from '../icon'
import { BaseProps } from '../base'
import { isNullish } from '../utils'

export interface ResultProps extends BaseProps {
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  icon?: ReactNode
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
    children,
    status = 'info',
    icon,
    title,
    description,
    ...restProps
  } = props

  const resultClass = classNames(
    'sar-result',
    `sar-result-${status}`,
    className,
  )

  return (
    <View {...restProps} className={resultClass}>
      <View className="sar-result-icon">
        {icon ?? <Icon name={mapStatusIcon[status]}></Icon>}
      </View>
      {!isNullish(title) && <View className="sar-result-title">{title}</View>}
      {!isNullish(description) && (
        <View className="sar-result-description">{description}</View>
      )}
      {!isNullish(children) && (
        <View className="sar-result-extra">{children}</View>
      )}
    </View>
  )
}

export default Result
