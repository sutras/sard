import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Search from './search.vue'

export const Search: EnhancedComponent<typeof _Search> = enhanceComponent(_Search)
export default Search

export type { SearchProps, SearchSlots, SearchEmits } from './common'
