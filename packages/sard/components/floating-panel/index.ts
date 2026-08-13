import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _FloatingPanel from './floating-panel.vue'

export const FloatingPanel: EnhancedComponent<typeof _FloatingPanel> =
  enhanceComponent(_FloatingPanel)
export default FloatingPanel

export type {
  FloatingPanelProps,
  FloatingPanelSlots,
  FloatingPanelEmits,
  FloatingPanelExpose,
} from './common'
