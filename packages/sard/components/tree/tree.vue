<template>
  <div ref="root" v-bind="attrs" :class="bem.b()" :style="treeStyle">
    <div
      v-if="lazy && !!load && (loadStatus !== 'loaded' || treeData.length === 0)"
      :class="bem.e('status')"
    >
      <Loading v-if="loadStatus === 'loading'" />
      <span v-else-if="loadStatus === 'error'" :class="bem.e('error')" @click="onErrorClick">
        {{ t('error') }}
      </span>
      <span v-else-if="loadStatus === 'loaded' && treeData.length === 0">
        {{ t('noData') }}
      </span>
    </div>
    <template v-for="(node, index) of treeData" :key="node.key">
      <TreeNode v-if="node.visible" :index="index" :node="node" />
    </template>
  </div>

  <Popover
    v-if="editable"
    v-model:visible="editPopoverVisible"
    theme="dark"
    position="left"
    :reference="editPopoverReference"
  >
    <Menu direction="vertical" theme="dark" @select="onEditPopoverSelect">
      <MenuItem value="addSibling" :label="t('addSibling')" #icon>
        <Plus />
      </MenuItem>
      <MenuItem value="addChild" :label="t('addChild')" #icon>
        <Plus />
      </MenuItem>
      <MenuItem value="delete" :label="t('removeNode')" #icon>
        <Minus />
      </MenuItem>
      <MenuItem value="edit" :label="t('edit')" #icon>
        <PencilSquare />
      </MenuItem>
    </Menu>
  </Popover>

  <Popover
    v-if="draggable"
    v-model:visible="dragPopoverVisible"
    theme="dark"
    position="left"
    :reference="dragRef"
  >
    <Menu theme="dark" position="left" direction="horizontal" @select="onDragPopoverSelect">
      <MenuItem v-for="option in dragOptions" :key="option.id" :value="option.id" #icon>
        <Left v-if="option.icon === 'left'" />
        <Right v-if="option.icon === 'right'" />
      </MenuItem>
    </Menu>
  </Popover>

  <Dialog
    v-model:visible="dialogVisible"
    :title="currentEditTitle"
    :before-close="beforeClose"
    :headed="false"
    button-variant="text"
    @visible-hook="onVisibleHook"
  >
    <div :class="bem.e('input-wrapper')">
      <div v-if="currentEditType === 'delete'" :class="bem.e('input-text')">
        {{ currentEditValue }}
      </div>
      <Input v-else ref="input" v-model="currentEditValue" :placeholder="t('please')" />
    </div>
  </Dialog>

  <Toast v-model:visible="toastVisible" :title="t('please')" />
</template>

<script setup lang="ts">
import {
  computed,
  provide,
  reactive,
  ref,
  shallowRef,
  toRef,
  useAttrs,
  useTemplateRef,
  watch,
} from 'vue'
import {
  createBem,
  uniqid,
  walkAncestor,
  walkNodes,
  walkDescendant,
  setCheckedRecursively,
  updateAncestorsChecked,
  initializeCheckNodes,
  getTreeCheckedKeys,
  getTreeHalfCheckedKeys,
  cssVar,
} from '../../utils'
import {
  type TreeProps,
  type TreeEmits,
  type TreeExpose,
  type TreeNaturalNode,
  type TreeStateNode,
  type TreeCleanNode,
  type TreeDropType,
  type TreeEditType,
  defaultNodeKeys,
  treeContextKey,
  defaultTreeProps,
  type TreeDragOption,
  type TreeDragIndent,
} from './common'
import TreeNode from './tree-node.vue'
import Popover from '../popover/popover.vue'
import Loading from '../loading/loading.vue'
import Input from '../input/input.vue'
import Dialog from '../dialog/dialog.vue'
import Toast from '../toast/toast.vue'
import { type DialogProps } from '../dialog'
import { useTranslateWithPrefix } from '../../locale'
import { useRtl, type PopperTarget } from '../../use'
import type { MotionHookName } from '../motion/common'
import Menu from '../menu/menu.vue'
import MenuItem from '../menu/menu-item.vue'
import { Left, Minus, PencilSquare, Plus, Right } from '@sard/icons'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TreeProps>(), defaultTreeProps)

const emit = defineEmits<TreeEmits>()

const attrs = useAttrs()

const bem = createBem('tree')

const { t } = useTranslateWithPrefix('tree')

// ============================ main ============================
const fieldKeys = computed(() => {
  return Object.assign({}, defaultNodeKeys, props.nodeKeys)
})

const treeData = ref<TreeStateNode[]>([])

const treeMap: Record<string | number, TreeStateNode> = {}

const totalLevel = ref(0)

// ============================ methods ============================
const toTreeStateNodes = (nodes: TreeNaturalNode[], parent: TreeStateNode | null) => {
  return nodes.map((node): TreeStateNode => {
    const key = node[fieldKeys.value.key] ?? uniqid()
    const stateNode = reactive<TreeStateNode>({
      title: node[fieldKeys.value.title],
      key,
      expanded: props.defaultExpandAll ? true : false,
      checked: false,
      indeterminate: false,
      parent,
      level: 0,
      offsetLevel: 0,
      visible: true,
      disabled: !!node.disabled,
      isLeaf: node[fieldKeys.value.isLeaf],
      loadStatus: 'idle',
      depth: parent ? parent.depth + 1 : 0,
    })

    if (node.children && node.children.length) {
      stateNode.children = toTreeStateNodes(node.children, stateNode)
    }

    treeMap[key] = stateNode
    return stateNode
  })
}

const setExpandedByNode = (node: TreeStateNode, expanded: boolean, reflow = true) => {
  node.expanded = expanded
  if (node.expanded) {
    walkAncestor(node.parent, (node) => {
      node.expanded = true
    })

    if (props.accordion) {
      const siblings = node.parent ? node.parent.children! : treeData.value
      siblings.forEach((sibling) => {
        if (sibling !== node) {
          sibling.expanded = false
        }
      })
    }
  }

  if (reflow) {
    setRenderPosition()
  }
}

const toggleExpandedByNode = (node: TreeStateNode) => {
  setExpandedByNode(node, !node.expanded)
}

const setExpanded = (key: string | number, expanded: boolean) => {
  const node = treeMap[key]
  if (node && node.expanded !== expanded) {
    setExpandedByNode(node, expanded)
  }
}

const toggleExpanded = (key: string | number) => {
  const node = treeMap[key]
  if (node) {
    toggleExpandedByNode(node)
  }
}

const setExpandedKeys = (keys: (string | number)[]) => {
  walkNodes(treeData.value, (node) => {
    node.expanded = false
  })

  keys.forEach((key) => {
    const node = treeMap[key]
    if (node && !node.expanded) {
      setExpandedByNode(node, true, false)
    }
  })

  setRenderPosition()
}

const getExpandedKeys = () => {
  const expandedKeys: (number | string)[] = []

  walkNodes(treeData.value, (node) => {
    if (node.expanded) {
      expandedKeys.push(node.key)
    }
  })

  return expandedKeys
}

const setCheckedByNode = (node: TreeStateNode, checked: boolean) => {
  setCheckedRecursively(node, checked, props.checkStrictly)
}

const bubbleChecked = (parentNode: TreeStateNode | null) => {
  updateAncestorsChecked(parentNode, props.checkStrictly)
}

const setCheckedKeys = (keys: (string | number)[]) => {
  initializeCheckNodes(treeData.value, treeMap, keys, props.checkStrictly)
}

const setChecked = (key: string | number, checked: boolean) => {
  const node = treeMap[key]
  if (node) {
    setCheckedByNode(node, checked)
  }
}

const getCheckedKeys = () => {
  return getTreeCheckedKeys(treeData.value)
}

const getHalfCheckedKeys = () => {
  return getTreeHalfCheckedKeys(treeData.value)
}

const prepend = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.unshift(newNode)
  newNode.parent = node

  node.expanded = true
  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const append = (node: TreeStateNode, newNode: TreeStateNode) => {
  const children = (node.children ??= [])
  children.push(newNode)
  newNode.parent = node

  node.expanded = true
  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const appendRoot = (newNode: TreeStateNode) => {
  treeData.value.push(newNode)
  newNode.parent = null

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const before = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node), 0, newNode)
  newNode.parent = node.parent

  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const after = (node: TreeStateNode, newNode: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node) + 1, 0, newNode)
  newNode.parent = node.parent

  bubbleChecked(node.parent)

  walkDescendant(newNode, (node) => {
    treeMap[node.key] = node
  })

  setRenderPosition()
}

const remove = (node: TreeStateNode, reflow = true) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  siblings.splice(siblings.indexOf(node), 1)
  if (siblings.length === 0 && node.parent) {
    node.parent.children = undefined
  }

  bubbleChecked(node.parent)

  walkDescendant(node, (node) => {
    delete treeMap[node.key]
  })

  if (reflow) {
    setRenderPosition()
  }
}

const levelup = async (node: TreeStateNode) => {
  if (node.parent) {
    await beforeDrop(node, node.parent, 'after')
    remove(node, false)
    after(node.parent!, node)
  }
}

const leveldown = async (node: TreeStateNode) => {
  const siblings = node.parent ? node.parent.children! : treeData.value
  const index = siblings.indexOf(node)
  if (index > 0) {
    const prevNode = siblings[index - 1]
    await beforeDrop(node, prevNode, 'append')
    remove(node, false)
    prevNode.expanded = true
    append(prevNode, node)
  }
}

const beforeDrop = async (
  draggingNode: TreeStateNode,
  dropNode: TreeStateNode,
  type: TreeDropType,
) => {
  if (props.beforeDrop) {
    const result = props.beforeDrop(draggingNode, dropNode, type)
    if (result instanceof Promise) {
      await (result as Promise<any>)
    } else if (result === false) {
      return Promise.reject()
    }
  }
}

const drop = async (draggingNode: TreeStateNode, dropNode: TreeStateNode, position: number) => {
  if (position === -1) {
    await beforeDrop(draggingNode, dropNode, 'before')
    remove(draggingNode, false)
    before(dropNode, draggingNode)
  } else {
    if (dropNode.children && dropNode.expanded) {
      await beforeDrop(draggingNode, dropNode, 'prepend')
      remove(draggingNode, false)
      prepend(dropNode, draggingNode)
    } else {
      await beforeDrop(draggingNode, dropNode, 'after')
      remove(draggingNode, false)
      after(dropNode, draggingNode)
    }
  }
}

const addRootNode = () => {
  currentEditValue.value = ''
  currentEditType.value = 'addRoot'
  dialogVisible.value = true
}

const getCleanTreeData = () => {
  function recur(nodes: TreeStateNode[]) {
    return nodes.map((node): TreeCleanNode => {
      const cleanNode: TreeCleanNode = {
        title: node.title,
        key: node.key,
      }
      if (node.children) {
        cleanNode.children = recur(node.children)
      }
      return cleanNode
    })
  }

  return recur(treeData.value)
}

const setRenderPosition = () => {
  let count = 0
  function recur(nodes: TreeStateNode[], parent: TreeStateNode | null) {
    nodes.forEach((node) => {
      node.depth = parent ? parent.depth + 1 : 0
      if (node.visible) {
        node.level = count++
      }
      if (node.children && node.expanded) {
        recur(node.children, node)
      }
    })
  }
  recur(treeData.value, null)
  totalLevel.value = count
}

const toggleCheck = (node: TreeStateNode, checked: boolean) => {
  setCheckedByNode(node, checked)
  emit('check', {
    checked,
    node,
  })
}

// ============================ initial ============================
const loadStatus = ref<'idle' | 'loading' | 'error' | 'loaded'>('loaded')

const initialize = async () => {
  if (props.lazy && props.load) {
    try {
      loadStatus.value = 'loading'
      const data = await props.load()
      loadStatus.value = 'loaded'
      initializeTree(data)
    } catch {
      loadStatus.value = 'error'
    }
  } else {
    initializeTree(props.data)
  }
}

const initializeTree = (data: TreeNaturalNode[]) => {
  treeData.value = toTreeStateNodes(data, null)

  if (props.defaultCheckedKeys && props.defaultCheckedKeys.length > 0) {
    setCheckedKeys(props.defaultCheckedKeys)
  }
  if (props.defaultExpandedKeys && props.defaultExpandedKeys.length > 0) {
    setExpandedKeys(props.defaultExpandedKeys)
  }
  setRenderPosition()
}

const onErrorClick = () => {
  initialize()
}

watch(
  () => props.data,
  () => {
    initializeTree(props.data)
  },
)

initialize()

// ============================ edit ============================
const inputRef = useTemplateRef('input')

let currentEditNode: TreeStateNode | undefined
const currentEditType = ref<TreeEditType>()
const currentEditValue = ref('')

const mapEditTypeTitle = {
  addSibling: t('addSibling'),
  addChild: t('addChild'),
  addRoot: t('addRoot'),
  edit: t('edit'),
  delete: t('removeNode'),
}
const currentEditTitle = computed(() => {
  return mapEditTypeTitle[currentEditType.value!]
})

const dialogVisible = ref(false)
const toastVisible = ref(false)

const onEditPopoverSelect = (option: { value?: TreeEditType }) => {
  currentEditType.value = option.value

  if (currentEditNode) {
    switch (option.value) {
      case 'addSibling':
      case 'addChild':
      case 'edit':
      case 'delete': {
        currentEditValue.value =
          option.value === 'edit' || option.value === 'delete' ? String(currentEditNode.title) : ''
        dialogVisible.value = true
        break
      }
    }
  }
  editPopoverVisible.value = false
}

const beforeClose: DialogProps['beforeClose'] = async (type) => {
  if (type === 'confirm') {
    if (currentEditValue.value.trim() === '') {
      toastVisible.value = true
      return Promise.reject()
    }

    if (props.beforeEdit) {
      const result = props.beforeEdit(
        currentEditNode!,
        currentEditValue.value,
        currentEditType.value!,
      )
      if (result instanceof Promise) {
        try {
          await (result as Promise<any>)
        } catch {
          return Promise.reject()
        }
      } else if (result === false) {
        return Promise.reject()
      }
    }

    switch (currentEditType.value) {
      case 'addSibling':
      case 'addChild':
      case 'addRoot': {
        const newNode = reactive<TreeStateNode>({
          title: currentEditValue.value,
          key: uniqid(),
          expanded: false,
          checked: false,
          indeterminate: false,
          parent: null,
          level: 0,
          offsetLevel: 0,
          visible: true,
          disabled: false,
          isLeaf: false,
          loadStatus: 'idle',
          depth: 0,
        })
        switch (currentEditType.value) {
          case 'addSibling':
            after(currentEditNode!, newNode)
            break
          case 'addChild':
            append(currentEditNode!, newNode)
            break
          case 'addRoot':
            appendRoot(newNode)
            break
        }
        break
      }
      case 'edit':
        currentEditNode!.title = currentEditValue.value
        break
      case 'delete':
        remove(currentEditNode!)
        break
    }
  }
}

const onVisibleHook = (name: MotionHookName) => {
  if (name === 'after-enter') {
    inputRef.value?.focus()
  }
}

// ========================= edit popover =========================

const editPopoverVisible = ref(false)

let editDomRect = new DOMRect()

const editPopoverReference: PopperTarget = {
  getBoundingClientRect() {
    return editDomRect
  },
}

const edit = (node: TreeStateNode, getEditRect: () => DOMRect) => {
  dragPopoverVisible.value = false

  if (editPopoverVisible.value && currentEditNode === node) {
    editPopoverVisible.value = false
  } else {
    currentEditNode = node
    editDomRect = getEditRect()
    editPopoverVisible.value = true
  }
}

// ====================== draggable popover ======================

const dragPopoverVisible = ref(false)

const dragRef = ref<Element>()

const dragOptions = ref<TreeDragOption[]>([])

let dragResolver: PromiseWithResolvers<TreeDragIndent>

const dragIndent = (
  options: TreeDragOption[],
  el: Element,
  resolver: PromiseWithResolvers<TreeDragIndent>,
) => {
  editPopoverVisible.value = false

  if (options.length === 0 || (dragPopoverVisible.value && el === dragRef.value)) {
    dragPopoverVisible.value = false
  } else {
    dragOptions.value = options
    dragRef.value = el
    dragPopoverVisible.value = true
    dragResolver = resolver
  }
}

const onDragPopoverSelect = ({ value }: { value: TreeDragIndent }) => {
  dragResolver.resolve(value)
  dragPopoverVisible.value = false
}

// ============================ filter ============================
function defaultFilterMethod(value: string, node: TreeStateNode) {
  return String(node.title).includes(value)
}

function filter(searchString: string) {
  const filterMethod = props.filterMethod || defaultFilterMethod

  function recur(nodes: TreeStateNode[]) {
    nodes.forEach((node) => {
      node.visible = filterMethod(searchString, node)

      if (node.children) {
        if (node.visible && props.filterMode === 'lenient') {
          walkNodes(node.children, (node) => {
            node.visible = true
          })
        } else {
          recur(node.children)
        }

        if (!node.visible && node.children.some((node) => node.visible)) {
          node.visible = true
        }
      }

      if (node.visible) {
        walkAncestor(node.parent, (node) => {
          node.expanded = true
        })
      }
    })
  }

  recur(treeData.value)

  setRenderPosition()
}

// ============================ 单选 ============================
const currentKey = shallowRef(props.current)

watch(
  () => props.current,
  () => {
    currentKey.value = props.current
  },
)

const singleSelect = (node: TreeStateNode) => {
  if (currentKey.value !== node.key) {
    currentKey.value = node.key
    emit('update:current', node.key, node)
    emit('select', node.key, node)
  }
}

const nodeClick = (node: TreeStateNode, event: any) => {
  emit('node-click', {
    node,
    event,
  })
}

const rootRef = useTemplateRef('root')

const isRtl = useRtl(rootRef)

const context = reactive({
  selectable: toRef(() => props.selectable),
  draggable: toRef(() => props.draggable),
  editable: toRef(() => props.editable),
  autoHeight: toRef(() => props.autoHeight),
  singleSelectable: toRef(() => props.singleSelectable),
  leafOnly: toRef(() => props.leafOnly),
  allowDrag: toRef(() => props.allowDrag),
  treeData: toRef(() => treeData.value),
  load: toRef(() => props.load),
  lazy: toRef(() => props.lazy),
  setExpandedByNode,
  toggleExpandedByNode,
  setCheckedByNode,
  levelup,
  leveldown,
  drop,
  toggleCheck,
  edit,
  currentKey,
  singleSelect,
  nodeClick,
  toTreeStateNodes,
  setRenderPosition,
  isRtl,
  dragIndent,
})

provide(treeContextKey, context)

// ============================ style ============================

const treeStyle = computed(() => {
  return props.draggable
    ? {
        height: `calc(${cssVar('tree-node-height')} * ${totalLevel.value})`,
      }
    : null
})

defineExpose<TreeExpose>({
  setExpanded,
  toggleExpanded,
  setExpandedKeys,
  getExpandedKeys,
  getCheckedKeys,
  getHalfCheckedKeys,
  setCheckedKeys,
  setChecked,
  filter,
  addRootNode,
  getCleanTreeData,
})
</script>
