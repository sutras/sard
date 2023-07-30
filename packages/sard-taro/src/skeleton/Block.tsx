import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface SkeletonBlockProps extends BaseProps {
  animated?: boolean
  round?: boolean
}

export const SkeletonBlock: FC<SkeletonBlockProps> = (props) => {
  const { className, animated, round, children, ...restProps } = props

  const [bem] = useBem('skeleton')

  const blockClass = classNames(
    bem.e('block'),
    bem.m('animated', animated),
    bem.m('round', round),
    className,
  )

  return (
    <View {...restProps} className={blockClass}>
      {children}
    </View>
  )
}

export default SkeletonBlock
