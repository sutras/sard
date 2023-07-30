import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'
import { useBem } from '../use'

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: number | string
}

export const SkeletonAvatar: FC<SkeletonAvatarProps> = (props) => {
  const { className, size, style, round, ...restProps } = props

  const [bem] = useBem('skeleton')

  const avatarClass = classNames(bem.e('avatar'), className)

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
