import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: number | string
}

export const SkeletonAvatar: FC<SkeletonAvatarProps> = (props) => {
  const { className, size, style, round, ...restProps } = props

  const avatarClass = classNames('sar-skeleton-avatar', className)

  const avatarStyle = {
    ...style,
    width: size,
    height: size,
  }

  return (
    <SkeletonBlock
      {...restProps}
      round={round}
      className={avatarClass}
      style={avatarStyle}
    />
  )
}

export default SkeletonAvatar
