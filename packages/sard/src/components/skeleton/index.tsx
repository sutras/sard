import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { SkeletonBlock } from './Block'
import { SkeletonAvatar } from './Avatar'
import { SkeletonTitle } from './Title'
import { SkeletonParagraph } from './Paragraph'

export * from './Block'
export * from './Avatar'
export * from './Title'
export * from './Paragraph'

export interface SkeletonProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  rows?: number
  title?: boolean
  avatar?: boolean
  avatarSize?: number | string
  avatarRound?: boolean
  round?: boolean
  loading?: boolean
  animated?: boolean
}

export interface SkeletonFC extends FC<SkeletonProps> {
  Block: typeof SkeletonBlock
  Avatar: typeof SkeletonAvatar
  Title: typeof SkeletonTitle
  Paragraph: typeof SkeletonParagraph
}

export const Skeleton: SkeletonFC = (props) => {
  const {
    className,
    children,
    rows = 3,
    title = false,
    avatar = false,
    avatarSize = 32,
    avatarRound = true,
    round = false,
    loading = true,
    animated = false,
    ...restProps
  } = props

  const skeletonClass = classNames('s-skeleton', className)

  return (
    <>
      {loading ? (
        <div {...restProps} className={skeletonClass}>
          {avatar && (
            <SkeletonAvatar
              size={avatarSize}
              animated={animated}
              round={avatarRound}
            />
          )}
          <div className="s-skeleton-content">
            {title && <SkeletonTitle animated={animated} round={round} />}
            <SkeletonParagraph rows={rows} animated={animated} round={round} />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

Skeleton.Block = SkeletonBlock
Skeleton.Avatar = SkeletonAvatar
Skeleton.Title = SkeletonTitle
Skeleton.Paragraph = SkeletonParagraph

export default Skeleton
