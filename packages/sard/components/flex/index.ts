import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Flex from './flex.vue'

export const Flex: EnhancedComponent<typeof _Flex> = enhanceComponent(_Flex)
export default Flex

export { type FlexProps, type FlexSlots, type FlexGap, flexGap } from './common'
