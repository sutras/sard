import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Badge from './badge.vue'

export const Badge: EnhancedComponent<typeof _Badge> = enhanceComponent(_Badge)
export default Badge

export type { BadgeProps, BadgeSlots } from './common'
