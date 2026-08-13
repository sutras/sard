import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Dialog from './dialog.vue'

export const Dialog: EnhancedComponent<typeof _Dialog> = enhanceComponent(_Dialog)
export default Dialog

export type { DialogProps, DialogSlots, DialogEmits } from './common'
export * from './imperative'
