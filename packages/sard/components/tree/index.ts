import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Tree from './tree.vue'
import _TreeBranch from './tree-branch.vue'
import _TreeNode from './tree-node.vue'

export const Tree: EnhancedComponent<typeof _Tree> = enhanceComponent(_Tree)
export const TreeBranch: EnhancedComponent<typeof _TreeBranch> = enhanceComponent(_TreeBranch)
export const TreeNode: EnhancedComponent<typeof _TreeNode> = enhanceComponent(_TreeNode)
export default Tree

export type {
  TreeProps,
  TreeEmits,
  TreeExpose,
  TreeNaturalNode,
  TreeStateNode,
  TreeDropType,
  TreeEditType,
} from './common'
