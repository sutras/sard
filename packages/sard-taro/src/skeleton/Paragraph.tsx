import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export const SkeletonParagraph: FC<SkeletonParagraphProps> = (props) => {
  const { className, rows = 3, animated, round, ...restProps } = props

  const skeletonClass = classNames('sar-skeleton-paragraph', className)

  return (
    <View {...restProps} className={skeletonClass}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <SkeletonBlock
            className="sar-skeleton-row"
            key={i}
            animated={animated}
            round={round}
          />
        ))}
    </View>
  )
}

export default SkeletonParagraph
