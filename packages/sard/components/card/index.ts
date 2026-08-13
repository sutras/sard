import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Card from './card.vue'

export const Card: EnhancedComponent<typeof _Card> = enhanceComponent(_Card)
export default Card

export type { CardProps, CardEmits, CardSlots } from './common'
