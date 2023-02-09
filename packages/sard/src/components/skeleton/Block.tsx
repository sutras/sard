import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface SkeletonBlockProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  animated?: boolean
  round?: boolean
}

export const SkeletonBlock: FC<SkeletonBlockProps> = (props) => {
  const { className, animated, round, children, ...restProps } = props

  const blockClass = classNames(
    's-skeleton-block',
    {
      's-skeleton-animated': animated,
      's-skeleton-round': round,
    },
    className,
  )

  return (
    <div {...restProps} className={blockClass}>
      {children}
    </div>
  )
}

export default SkeletonBlock
