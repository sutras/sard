import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Navbar from './navbar.vue'
import _NavbarItem from './navbar-item.vue'

export const Navbar: EnhancedComponent<typeof _Navbar> = enhanceComponent(_Navbar)
export const NavbarItem: EnhancedComponent<typeof _NavbarItem> = enhanceComponent(_NavbarItem)
export default Navbar

export type {
  NavbarProps,
  NavbarSlots,
  NavbarEmits,
  NavbarItemProps,
  NavbarItemSlots,
  NavbarItemEmits,
} from './common'
