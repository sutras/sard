import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Popup from './popup.vue'

export const Popup: EnhancedComponent<typeof _Popup> = enhanceComponent(_Popup)
export default Popup

export {
  type PopupProps,
  type PopupSlots,
  type PopupEmits,
  type PopupExpose,
  type PopupContext,
  usePopupVisibleHookProvide,
  usePopupEnter,
  useInPopup,
} from './common'

export { type PopupItem, popupManager } from './popup-manager'
