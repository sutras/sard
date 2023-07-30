import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'
import { useBem } from '../use'

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export const SkeletonParagraph: FC<SkeletonParagraphProps> = (props) => {
  const { className, rows = 3, animated, round, ...restProps } = props

  const [bem] = useBem('skeleton')

  const skeletonClass = classNames(bem.e('paragraph'), className)

  return (
    <View {...restProps} className={skeletonClass}>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <SkeletonBlock
            className={classNames(
              bem.e('row'),
              bem.em('row', 'later', index > 0),
              bem.em('row', 'last', index === rows - 1),
            )}
            key={index}
            animated={animated}
            round={round}
          />
        ))}
    </View>
  )
}

export default SkeletonParagraph
