import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _PuzzleVerify from './puzzle-verify.vue'

export const PuzzleVerify: EnhancedComponent<typeof _PuzzleVerify> = enhanceComponent(_PuzzleVerify)
export default PuzzleVerify

export type {
  PuzzleVerifyProps,
  PuzzleVerifySlots,
  PuzzleVerifyEmits,
  PuzzleVerifyExpose,
} from './common'
