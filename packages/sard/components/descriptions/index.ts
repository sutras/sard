import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Descriptions from './descriptions.vue'
import _DescriptionsItem from './descriptions-item.vue'

export const Descriptions: EnhancedComponent<typeof _Descriptions> = enhanceComponent(_Descriptions)
export const DescriptionsItem: EnhancedComponent<typeof _DescriptionsItem> =
  enhanceComponent(_DescriptionsItem)
export default Descriptions

export type {
  DescriptionsProps,
  DescriptionsSlots,
  DescriptionsEmits,
  DescriptionsItemProps,
  DescriptionsItemSlots,
  DescriptionsItemEmits,
  DescriptionsContext,
} from './common'
