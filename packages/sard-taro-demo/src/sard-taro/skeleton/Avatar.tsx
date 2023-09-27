import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'
import { useBem } from '../use'
import { filterNullish } from '../utils'

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: number | string
}

export const SkeletonAvatar: FC<SkeletonAvatarProps> = (props) => {
  const { className, size, style, round, ...restProps } = props

  const [bem] = useBem('skeleton')

  return (
    <SkeletonBlock
      {...restProps}
      round={round}
      className={classNames(bem.e('avatar'), className)}
      style={{
        ...style,
        ...filterNullish({
          width: size,
          height: size,
        }),
      }}
    />
  )
}

export default SkeletonAvatar
