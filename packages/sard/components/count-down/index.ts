import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _CountDown from './count-down.vue'

export const CountDown: EnhancedComponent<typeof _CountDown> = enhanceComponent(_CountDown)
export default CountDown

export type { CountDownProps, CountDownSlots, CountDownEmits, CountDownExpose } from './common'

export * from './useCountDown'
