import { type DefaultProps } from '../config'

export interface SkeletonProps {
  rows?: number
  title?: boolean
  avatar?: boolean
  avatarSize?: string
  avatarRound?: boolean
  round?: boolean
  loading?: boolean
  animated?: boolean
}

export const defaultSkeletonProps: DefaultProps<SkeletonProps> = {
  rows: 3,
  loading: true,
}

export interface SkeletonSlots {
  default?(props: Record<string, never>): any
}

export interface SkeletonBlockProps {
  animated?: boolean
  round?: boolean
  width?: string
  height?: string
}

export interface SkeletonAvatarProps extends SkeletonBlockProps {
  size?: string
}

export interface SkeletonParagraphProps extends SkeletonBlockProps {
  rows?: number
}

export interface SkeletonTitleProps extends SkeletonBlockProps {}
