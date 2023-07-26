import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'

export interface SkeletonBlockProps extends BaseProps {
  animated?: boolean
  round?: boolean
}

export const SkeletonBlock: FC<SkeletonBlockProps> = (props) => {
  const { className, animated, round, children, ...restProps } = props

  const blockClass = classNames(
    'sar-skeleton-block',
    {
      'sar-skeleton-animated': animated,
      'sar-skeleton-round': round,
    },
    className,
  )

  return (
    <View {...restProps} className={blockClass}>
      {children}
    </View>
  )
}

export default SkeletonBlock
