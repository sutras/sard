import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Space from './space.vue'

export const Space: EnhancedComponent<typeof _Space> = enhanceComponent(_Space)
export default Space

export { type SpaceProps, type SpaceSlots, type SpaceSize, spaceSizes } from './common'
