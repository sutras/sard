import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Overlay from './overlay.vue'

export const Overlay: EnhancedComponent<typeof _Overlay> = enhanceComponent(_Overlay)
export default Overlay

export type { OverlayProps, OverlaySlots, OverlayEmits } from './common'
