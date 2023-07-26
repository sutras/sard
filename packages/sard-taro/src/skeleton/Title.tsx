import { FC } from 'react'
import classNames from 'classnames'
import { SkeletonBlock, SkeletonBlockProps } from './Block'

export interface SkeletonTitleProps extends SkeletonBlockProps {
  width?: number | string
}

export const SkeletonTitle: FC<SkeletonTitleProps> = (props) => {
  const { className, style, width, ...restProps } = props

  const titleClass = classNames('sar-skeleton-title', className)

  const titleStyle = {
    ...style,
    width,
  }

  return (
    <SkeletonBlock {...restProps} className={titleClass} style={titleStyle} />
  )
}

export default SkeletonTitle
