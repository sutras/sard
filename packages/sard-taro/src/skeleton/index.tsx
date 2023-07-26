import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { SkeletonBlock } from './Block'
import { SkeletonAvatar } from './Avatar'
import { SkeletonTitle } from './Title'
import { SkeletonParagraph } from './Paragraph'
import { BaseProps } from '../base'

export * from './Block'
export * from './Avatar'
export * from './Title'
export * from './Paragraph'

export interface SkeletonProps extends BaseProps {
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
    avatarRound = false,
    round = false,
    loading = true,
    animated = false,
    ...restProps
  } = props

  const skeletonClass = classNames('sar-skeleton', className)

  return (
    <>
      {loading ? (
        <View {...restProps} className={skeletonClass}>
          {avatar && (
            <SkeletonAvatar
              size={avatarSize}
              animated={animated}
              round={avatarRound}
            />
          )}
          <View className="sar-skeleton-content">
            {title && <SkeletonTitle animated={animated} round={round} />}
            <SkeletonParagraph rows={rows} animated={animated} round={round} />
          </View>
        </View>
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
