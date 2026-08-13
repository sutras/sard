import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Grid from './grid.vue'
import _GridItem from './grid-item.vue'

export const Grid: EnhancedComponent<typeof _Grid> = enhanceComponent(_Grid)
export const GridItem: EnhancedComponent<typeof _GridItem> = enhanceComponent(_GridItem)
export default Grid

export type { GridProps, GridSlots, GridItemProps, GridItemSlots, GridItemEmits } from './common'
