import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'
import { useBem } from '../use'

export interface SkeletonTitleProps extends SkeletonBlockProps {
  width?: number | string
}

export const SkeletonTitle: FC<SkeletonTitleProps> = (props) => {
  const { className, style, width, ...restProps } = props

  const [bem] = useBem('skeleton')

  return (
    <SkeletonBlock
      {...restProps}
      className={classNames(bem.e('title'), className)}
      style={{
        ...style,
        width,
      }}
    />
  )
}

export default SkeletonTitle
