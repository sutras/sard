import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _TabbarPit from './tabbar-pit.vue'

export const TabbarPit: EnhancedComponent<typeof _TabbarPit> = enhanceComponent(_TabbarPit)
export default TabbarPit

export type { TabbarPitProps, TabbarPitSlots, TabbarPitEmits, TabbarPitExpose } from './common'
