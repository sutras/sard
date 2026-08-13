import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Menu from './menu.vue'
import _MenuItem from './menu-item.vue'

export const Menu: EnhancedComponent<typeof _Menu> = enhanceComponent(_Menu)
export const MenuItem: EnhancedComponent<typeof _MenuItem> = enhanceComponent(_MenuItem)
export default Menu

export type { MenuProps, MenuEmits, MenuItemProps, MenuItemEmits } from './common'
