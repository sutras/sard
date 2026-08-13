import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Tabs from './tabs.vue'
import _Tab from './tab.vue'

export const Tabs: EnhancedComponent<typeof _Tabs> = enhanceComponent(_Tabs)
export const Tab: EnhancedComponent<typeof _Tab> = enhanceComponent(_Tab)
export default Tabs

export type { TabsProps, TabsSlots, TabsEmits, TabProps, TabSlots, TabEmits } from './common'
