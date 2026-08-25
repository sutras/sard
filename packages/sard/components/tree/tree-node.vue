<template>
  <div
    ref="node"
    :class="nodeClass"
    :style="nodeStyle"
    @touchstart="onNodeTouchStart"
    @touchend="onNodeTouchEnd"
    @touchcancel="onNodeTouchEnd"
    @pointerdown="onNodePointerDown"
    @click="onNodeClick"
  >
    <div :style="indentStyle"></div>
    <div :class="arrowClass">
      <Right :class="bem.e('arrow-icon')" />
    </div>
    <Loading v-if="node.loadStatus === 'loading'" :class="bem.e('loading')" />
    <div
      v-if="treeContext.selectable || canSingleSelectable"
      :class="selectionClass"
      @touchstart.stop="onSelectionTouchStart"
      @touchend.stop="onSelectionTouchEnd"
      @touchcancel.stop="onSelectionTouchEnd"
      @pointerdown.stop="onSelectionPointerDown"
      @click.stop
    >
      <Checkbox
        v-if="treeContext.selectable"
        readonly
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="node.disabled"
      />
      <Radio
        v-if="canSingleSelectable"
        readonly
        :checked="isSingleChecked"
        :disabled="node.disabled"
      />
    </div>
    <div :class="bem.e('title')">
      {{ node.title }}
    </div>
    <div v-if="treeContext.draggable || treeContext.editable" :class="bem.e('toolbar')">
      <div
        v-if="treeContext.editable"
        ref="edit"
        :class="editClass"
        @touchstart.stop.prevent="onEditTouchStart"
        @touchend="onEditTouchEnd"
        @touchcancel="onEditTouchEnd"
        @pointerdown.stop="onEditPointerDown"
        @click.stop
      >
        <PencilSquare />
      </div>

      <div
        v-if="treeContext.draggable"
        ref="drag"
        :class="bem.e('drag')"
        @touchstart.stop.prevent="onDragTouchStart"
        @touchmove.stop.prevent="onDragTouchMove"
        @touchend="onDragTouchEnd"
        @touchcancel="onDragTouchEnd"
        @pointerdown.stop="onDragPointerDown"
        @click.stop
      >
        <Loading v-if="dropLoading" />
        <template v-else>
          <List />
          <div :class="bem.e('level-btn')">
            <Left v-if="isLastNode" :class="bem.e('level-btn-icon')" />
            <Right v-if="index !== 0" :class="bem.e('level-btn-icon')" />
          </div>
        </template>
      </div>
    </div>
  </div>

  <template
    v-if="
      treeContext.draggable &&
      !isMergedLeaf &&
      node.expanded &&
      node.children &&
      node.children.length > 0
    "
  >
    <template v-for="(subNode, index) of node.children" :key="subNode.key">
      <TreeNode v-if="subNode.visible" :index="index" :node="subNode" />
    </template>
  </template>

  <Collapse
    v-if="!treeContext.draggable && !isMergedLeaf && node.children && node.children.length > 0"
    lazy
    destroy-on-close
    :visible="node.expanded"
  >
    <template v-for="(subNode, index) of node.children" :key="subNode.key">
      <TreeNode v-if="subNode.visible" :index="index" :node="subNode" />
    </template>
  </Collapse>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue'
import {
  type Point,
  createBem,
  clamp,
  getNodeLevel,
  walkDescendant,
  cssVar,
  withResolvers,
} from '../../utils'
import {
  type TreeDragIndent,
  type TreeDragOption,
  type TreeNodeProps,
  type TreeStateNode,
  treeContextKey,
} from '../tree/common'
import { usePointerDown, useSimulatedClick, useSimulatedPress } from '../../use'
import Checkbox from '../checkbox/checkbox.vue'
import Radio from '../radio/radio.vue'
import Loading from '../loading/loading.vue'
import Collapse from '../collapse/collapse.vue'
import { Left, List, PencilSquare, Right } from '@sard/icons'

defineOptions({
  name: 'TreeNode',
})

const props = withDefaults(defineProps<TreeNodeProps>(), {})

const bem = createBem('tree')

const treeContext = inject(treeContextKey)!

const level = computed(() => {
  return getNodeLevel(props.node)
})

const nodeOpacity = ref(0)

onMounted(() => {
  setTimeout(() => {
    nodeOpacity.value = 1
  }, 30)
})

// ============================ drag ============================
const nodeRef = useTemplateRef('node')
const dragRef = useTemplateRef('drag')

const allowDrag = computed(() => {
  return !treeContext.allowDrag || treeContext.allowDrag(props.node)
})

let dropNode: TreeStateNode | undefined
let dropPosition: number | undefined

const dragging = ref(false)
let nodeRect: DOMRect | undefined
const dropLoading = ref(false)

const translateY = ref(0)

let obviousNodes: TreeStateNode[] = []

const onDragStart = () => {
  dragging.value = true

  obviousNodes = []
  treeContext.treeData.forEach((node) => {
    walkDescendant(node, (node) => {
      obviousNodes.push(node)
      if (!node.expanded) {
        return true
      }
    })
  })
}

const onDragMove = (offset: Point) => {
  translateY.value = offset.y

  const nodeHeight = nodeRect!.height

  const currentIndex = obviousNodes.findIndex((node) => node === props.node)

  const offsetIndex = Math.floor(Math.abs(offset.y) / nodeHeight + 0.5) * (offset.y < 0 ? -1 : 1)

  const targetIndex = clamp(currentIndex + offsetIndex, 0, obviousNodes.length - 1)

  const targetNode = obviousNodes[targetIndex]

  if (dropNode !== targetNode) {
    obviousNodes.forEach((node, index) => {
      node.offsetLevel =
        index < currentIndex
          ? index >= targetIndex
            ? 1
            : 0
          : index > currentIndex
            ? index <= targetIndex
              ? -1
              : 0
            : 0
    })
    dropNode = targetNode
    dropPosition = targetNode === props.node ? 0 : offset.y < 0 ? -1 : 1
  }
}

const onDragEnd = async () => {
  try {
    dropLoading.value = true
    if (dropNode && dropPosition && dropNode !== props.node) {
      await treeContext.drop(props.node, dropNode, dropPosition)
    }
  } catch {
    void 0
  } finally {
    dropLoading.value = false
    dragging.value = false
    dropNode = undefined
    dropPosition = undefined
    obviousNodes.forEach((node) => {
      node.offsetLevel = 0
    })
    translateY.value = 0
  }
}

const [onDragSimulatedClickTouchStart, onDragSimulatedClickTouchEnd] = useSimulatedClick({
  onClick: () => {
    const resolver = withResolvers<TreeDragIndent>()
    resolver.promise.then((indent) => {
      onPopoverSelect(indent)
    })

    treeContext.dragIndent(popoverOptions.value, dragRef.value!, resolver)
  },
  duration: 300,
})

const [
  onDragSimulatedPressTouchStart,
  onDragSimulatedPressTouchMove,
  onDragSimulatedPressTouchEnd,
] = useSimulatedPress({
  start: () => {
    treeContext.setExpandedByNode(props.node, false)
    onDragStart()
  },
  move: (_, { delta }) => {
    if (nodeRect) {
      onDragMove(delta)
    }
  },
  end: () => {
    onDragEnd()
  },
  duration: 150,
})

const onDragTouchStart = async (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  onDragSimulatedPressTouchStart(event)
  onDragSimulatedClickTouchStart(event)
  nodeRect = nodeRef.value!.getBoundingClientRect()
}

const onDragTouchMove = (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  onDragSimulatedPressTouchMove(event)
}

const onDragTouchEnd = (event: TouchEvent) => {
  if (!allowDrag.value || dropLoading.value) return

  nodeRect = undefined

  onDragSimulatedClickTouchEnd(event)
  onDragSimulatedPressTouchEnd()
}

const onDragPointerDown = usePointerDown(onDragTouchStart, onDragTouchMove, onDragTouchEnd)

// ============================ level ============================

const isLastNode = computed(() => {
  return props.node.parent && props.node.parent.children!.length - 1 === props.index
})

const popoverOptions = computed(() => {
  const options: TreeDragOption[] = []
  if (isLastNode.value) {
    options.push({ icon: treeContext.isRtl ? 'right' : 'left', id: 'left' })
  }
  if (props.index !== 0) {
    options.push({ icon: treeContext.isRtl ? 'left' : 'right', id: 'right' })
  }
  return options
})

const onPopoverSelect = async (value: TreeDragIndent) => {
  try {
    dropLoading.value = true

    switch (value) {
      case 'left':
        await treeContext.levelup(props.node)
        break
      case 'right':
        await treeContext.leveldown(props.node)
        break
    }
  } catch {
    void 0
  } finally {
    dropLoading.value = false
  }
}

// ============================ expand ============================

const isMergedLeaf = computed(() => {
  const { children, isLeaf } = props.node
  return treeContext.lazy && treeContext.load ? isLeaf : !children || children.length === 0
})

const onNodeClick = async (event: any) => {
  if (dropLoading.value) return

  const node = props.node
  const { loadStatus, isLeaf } = node
  if (loadStatus === 'loading') {
    return
  }

  if (treeContext.lazy && treeContext.load && !isLeaf && loadStatus === 'idle') {
    try {
      node.loadStatus = 'loading'
      const treeNodes = (await treeContext.load(node)) || []
      node.loadStatus = 'loaded'
      node.children = treeContext.toTreeStateNodes(treeNodes, node)
      if (node.children.length === 0) {
        node.isLeaf = true
      } else {
        treeContext.setRenderPosition()
        if (node.checked) {
          treeContext.setCheckedByNode(props.node, true)
        }
      }
    } catch {
      node.loadStatus = 'idle'
      return
    }
  }

  if (!isMergedLeaf.value) {
    treeContext.toggleExpandedByNode(node)
  }
  if (treeContext.selectable && !node.disabled && isMergedLeaf.value) {
    treeContext.toggleCheck(node, !node.checked)
  }
  if (canSingleSelectable.value && !node.disabled && isMergedLeaf.value) {
    treeContext.singleSelect(node)
  }
  treeContext.nodeClick(node, event)
}

const nodeActive = ref(false)

const onNodeTouchStart = () => {
  if (dropLoading.value) return

  if (!isMergedLeaf.value || (canSingleSelectable.value && treeContext.leafOnly)) {
    nodeActive.value = true
  }
}

const onNodeTouchEnd = () => {
  nodeActive.value = false
}

const onNodePointerDown = usePointerDown(onNodeTouchStart, undefined, onNodeTouchEnd)

// ============================ select ============================

const canSingleSelectable = computed(() => {
  return treeContext.singleSelectable && (!treeContext.leafOnly || isMergedLeaf.value)
})

const isSingleChecked = computed(() => props.node.key === treeContext.currentKey)

const [onSelectionTouchStart, onSelectionTouchEnd] = useSimulatedClick({
  onClick: () => {
    if (!props.node.disabled) {
      if (treeContext.selectable) {
        treeContext.toggleCheck(props.node, !props.node.checked)
      }
      if (canSingleSelectable.value) {
        treeContext.singleSelect(props.node)
      }
    }
  },
})

const onSelectionPointerDown = usePointerDown(onSelectionTouchStart, undefined, onSelectionTouchEnd)

// ============================ edit ============================

const editRef = useTemplateRef('edit')
const getEditRect = () => {
  return editRef.value!.getBoundingClientRect()
}

const [onEditTouchStart, onEditTouchEnd] = useSimulatedClick({
  onClick: () => {
    if (dropLoading.value) return

    treeContext.edit(props.node, getEditRect)
  },
})

const onEditPointerDown = usePointerDown(onEditTouchStart, undefined, onEditTouchEnd)

// ============================ style ============================
const nodeClass = computed(() => {
  return [
    bem.e('node'),
    bem.em('node', 'dragging', dragging.value),
    bem.em('node', 'selectable', treeContext.selectable),
    bem.em('node', 'active', nodeActive.value),
    bem.em('node', 'current', isSingleChecked.value),
    bem.em('node', 'draggable', treeContext.draggable),
    bem.em('node', 'disallowed', !allowDrag.value),
    bem.em('node', 'truncated', treeContext.draggable || !treeContext.autoHeight),
  ]
})

const nodeStyle = computed(() => {
  return treeContext.draggable
    ? {
        transform: `translate3d(0,calc(${cssVar('tree-node-height')} * ${
          props.node.level + props.node.offsetLevel
        } + ${dragging.value ? translateY.value : 0}px),0)`,
        opacity: nodeOpacity.value,
      }
    : ''
})

const editClass = computed(() => {
  return bem.e('edit')
})

const indentStyle = computed(() => {
  return {
    width: `calc(${cssVar('tree-indent-width')} * ${level.value})`,
    transition: `width 300ms`,
  }
})

const arrowClass = computed(() => {
  return [
    bem.e('arrow'),
    bem.em('arrow', 'expanded', props.node.expanded),
    bem.em('arrow', 'is-leaf', isMergedLeaf.value),
  ]
})

const selectionClass = computed(() => {
  return [bem.e('selection'), bem.em('selection', 'disabled', props.node.disabled)]
})
</script>
