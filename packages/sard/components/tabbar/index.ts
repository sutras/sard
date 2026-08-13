import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Tabbar from './tabbar.vue'
import _TabbarItem from './tabbar-item.vue'

export const Tabbar: EnhancedComponent<typeof _Tabbar> = enhanceComponent(_Tabbar)
export const TabbarItem: EnhancedComponent<typeof _TabbarItem> = enhanceComponent(_TabbarItem)
export default Tabbar

export type {
  TabbarProps,
  TabbarSlots,
  TabbarEmits,
  TabbarItemProps,
  TabbarItemSlots,
  TabbarItemEmits,
} from './common'
