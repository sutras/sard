import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _NavbarPit from './navbar-pit.vue'

export const NavbarPit: EnhancedComponent<typeof _NavbarPit> = enhanceComponent(_NavbarPit)
export default NavbarPit

export type { NavbarPitProps } from './common'
