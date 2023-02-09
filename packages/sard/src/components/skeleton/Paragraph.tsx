import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export const SkeletonParagraph: FC<SkeletonParagraphProps> = (props) => {
  const { className, rows = 3, animated, round, ...restProps } = props

  const skeletonClass = classNames('s-skeleton-paragraph', className)

  return (
    <div {...restProps} className={skeletonClass}>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <SkeletonBlock
            className="s-skeleton-row"
            key={i}
            animated={animated}
            round={round}
          />
        ))}
    </div>
  )
}

export default SkeletonParagraph
