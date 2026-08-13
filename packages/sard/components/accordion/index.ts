import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Accordion from './accordion.vue'
import _AccordionItem from './accordion-item.vue'

export const Accordion: EnhancedComponent<typeof _Accordion> = enhanceComponent(_Accordion)
export const AccordionItem: EnhancedComponent<typeof _AccordionItem> =
  enhanceComponent(_AccordionItem)
export default Accordion

export type {
  AccordionProps,
  AccordionEmits,
  AccordionSlots,
  AccordionItemProps,
  AccordionItemEmits,
  AccordionItemSlots,
} from './common'
