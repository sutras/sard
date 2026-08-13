import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _List from './list.vue'
import _ListItem from './list-item.vue'

export const List: EnhancedComponent<typeof _List> = enhanceComponent(_List)
export const ListItem: EnhancedComponent<typeof _ListItem> = enhanceComponent(_ListItem)
export default List

export type { ListProps, ListSlots, ListItemProps, ListItemEmits, ListItemSlots } from './common'
