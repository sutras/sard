import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Skeleton from './skeleton.vue'
import _SkeletonAvatar from './skeleton-avatar.vue'
import _SkeletonBlock from './skeleton-block.vue'
import _SkeletonParagraph from './skeleton-paragraph.vue'
import _SkeletonTitle from './skeleton-title.vue'

export const Skeleton: EnhancedComponent<typeof _Skeleton> = enhanceComponent(_Skeleton)
export const SkeletonAvatar: EnhancedComponent<typeof _SkeletonAvatar> =
  enhanceComponent(_SkeletonAvatar)
export const SkeletonBlock: EnhancedComponent<typeof _SkeletonBlock> =
  enhanceComponent(_SkeletonBlock)
export const SkeletonParagraph: EnhancedComponent<typeof _SkeletonParagraph> =
  enhanceComponent(_SkeletonParagraph)
export const SkeletonTitle: EnhancedComponent<typeof _SkeletonTitle> =
  enhanceComponent(_SkeletonTitle)
export default Skeleton

export type {
  SkeletonProps,
  SkeletonSlots,
  SkeletonBlockProps,
  SkeletonAvatarProps,
  SkeletonParagraphProps,
  SkeletonTitleProps,
} from './common'
