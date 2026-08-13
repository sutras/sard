import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Sidebar from './sidebar.vue'
import _SidebarItem from './sidebar-item.vue'

export const Sidebar: EnhancedComponent<typeof _Sidebar> = enhanceComponent(_Sidebar)
export const SidebarItem: EnhancedComponent<typeof _SidebarItem> = enhanceComponent(_SidebarItem)
export default Sidebar

export type {
  SidebarProps,
  SidebarSlots,
  SidebarEmits,
  SidebarExpose,
  SidebarItemProps,
  SidebarItemSlots,
  SidebarItemEmits,
  SidebarItemExpose,
} from './common'
