import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Avatar from './avatar.vue'
import _AvatarGroup from './avatar-group.vue'

export const Avatar: EnhancedComponent<typeof _Avatar> = enhanceComponent(_Avatar)
export const AvatarGroup: EnhancedComponent<typeof _AvatarGroup> = enhanceComponent(_AvatarGroup)
export default Avatar

export type {
  AvatarProps,
  AvatarSlots,
  AvatarGroupProps,
  AvatarGroupSlots,
  AvatarGroupEmits,
  AvatarGroupExpose,
} from './common'
