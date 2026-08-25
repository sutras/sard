<template>
  <div :class="bem.b()">
    <Tabs v-model="currentTab" :options="tabsOptions" scrollable />

    <slot name="top" :tab-index="currentTab"></slot>

    <div :class="bem.e('container')">
      <div :class="bem.e('wrapper')" :style="wrapperStyle">
        <div v-for="(panel, panelIndex) in panels" :key="panelIndex" :class="bem.e('pane')">
          <div :class="bem.e('options')">
            <div
              v-for="(node, optionIndex) in panel.nodes"
              :key="optionIndex"
              :class="[
                bem.e('option'),
                bem.is('selected', node.selected),
                bem.is('disabled', node.disabled),
              ]"
              @click="onNodeClick(node, panelIndex)"
            >
              <div v-if="multiple" :class="bem.e('selection')" @click.stop="onCheckClick(node)">
                <Checkbox
                  readonly
                  :checked="node.checked"
                  :indeterminate="node.indeterminate"
                  :disabled="node.disabled"
                />
              </div>
              <div
                :class="[bem.e('option-loading'), bem.is('show', node.loadStatus === 'loading')]"
              >
                <Loading />
              </div>
              <div :class="bem.e('option-label')">
                {{ node.label }}
              </div>
              <div v-if="!multiple" :class="bem.e('option-icon')">
                <Success />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="lazy && !!load" :class="statusWrapperClass">
        <div :class="bem.e('status')">
          <Loading v-if="loadStatus === 'loading'" :class="bem.e('loading')" />
          <span v-else-if="loadStatus === 'error'" :class="bem.e('error')" @click="initialize">
            {{ t('error') }}
          </span>
          <span
            v-else-if="loadStatus === 'loaded' && treeData.length === 0"
            :class="bem.e('empty')"
            @click="initialize"
          >
            {{ t('noData') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { createBem } from '../../utils'
import Tabs from '../tabs/tabs.vue'
import Loading from '../loading/loading.vue'
import Checkbox from '../checkbox/checkbox.vue'
import {
  type CascaderProps,
  type CascaderSlots,
  type CascaderEmits,
  type CascaderStateNode,
  defaultCascaderProps,
} from './common'
import { useCascaderTree } from './useCascaderTree'
import { useCascaderTabs } from './useCascaderTabs'
import { useTranslateWithPrefix } from '../../locale'
import { useOptionKeys } from '../../use'
import { Success } from '@sard/icons'

const props = withDefaults(defineProps<CascaderProps>(), defaultCascaderProps)

defineSlots<CascaderSlots>()

const emit = defineEmits<CascaderEmits>()

const bem = createBem('cascader')

const { t } = useTranslateWithPrefix('cascader')

const optionKeys = useOptionKeys(props)

const innerValue = ref<typeof props.modelValue>()

const {
  treeData,
  originalTreeData,
  loadStatus,
  toStateNodes,
  setSelectedByNode,
  updateChecked,
  setCheckedByNode,
  isLeaf,
  getCheckedLeaves,
  getCheckedNodes,
  getAncestors,
  initialize,
} = useCascaderTree(props, {
  innerValue,
  optionKeys,
})

initialize()

const { panels, currentTab, tabsOptions } = useCascaderTabs(props, {
  treeData,
})

const triggerMultipleChange = () => {
  const nodes = props.checkStrictly ? getCheckedNodes() : getCheckedLeaves()

  const nextValue = props.allLevels
    ? nodes.map((node) => getAncestors(node).map((node) => node.value))
    : nodes.map((node) => node.value)

  innerValue.value = nextValue

  const options = nodes.map((node) => getAncestors(node).map((node) => node.option))

  emit('update:modelValue', nextValue, options)
  emit('change', nextValue, options)
}

const triggerSingleChange = (node: CascaderStateNode) => {
  const nextValue = props.allLevels
    ? panels.value
        .map((panel) => panel.selected)
        .filter(Boolean)
        .map((node) => node!.value)
    : node.value

  innerValue.value = nextValue

  const options = panels.value
    .map((panel) => panel.selected)
    .filter(Boolean)
    .map((node) => node!.option)

  emit('update:modelValue', nextValue, options)
  emit('change', nextValue, options)
}

const onCheckClick = (node: CascaderStateNode) => {
  if (node.disabled) return

  setCheckedByNode(node, !node.checked)
  triggerMultipleChange()
}

const onNodeClick = async (node: CascaderStateNode, panelIndex: number) => {
  if (node.disabled) return

  if (node.loadStatus === 'loading') {
    return
  }

  if (props.lazy && props.load && !node.isLeaf && node.loadStatus === 'idle') {
    try {
      node.loadStatus = 'loading'
      const treeNodes = (await props.load(node)) || []
      node.loadStatus = 'loaded'
      node.children = toStateNodes(treeNodes, node)
      updateChecked(innerValue.value)
      node.option.children = treeNodes
      originalTreeData.value = [...originalTreeData.value]
      if (node.children.length === 0) {
        node.isLeaf = true
      } else {
        if (node.checked) {
          setCheckedByNode(node, true)
        }
      }
    } catch {
      node.loadStatus = 'idle'
      return
    }
  }

  setSelectedByNode(node)

  const isLast = isLeaf(node)

  if (!isLast) {
    currentTab.value = panels.value.length - 1
  }

  if (!isLast && node.children && node.children.length === 0) {
    node.loadStatus = 'loading'
  }

  emit('select', node.option, panelIndex)

  // 多选
  if (props.multiple) {
    if (isLast) {
      setCheckedByNode(node, !node.checked)
      triggerMultipleChange()
    }
  }

  // 单选
  else {
    if (isLast || props.changeOnSelect) {
      triggerSingleChange(node)
    }
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value === innerValue.value) return

    innerValue.value = value

    updateChecked(value)

    currentTab.value = panels.value.length - 1
  },
  {
    immediate: true,
  },
)

// ============================ style ============================

const wrapperStyle = computed(() => {
  return {
    '--x': `${-Number(currentTab.value) * 100}%`,
  }
})

const statusWrapperClass = computed(() => {
  return [
    bem.e('status-wrapper'),
    bem.em('status-wrapper', 'show', loadStatus.value !== 'loaded' || treeData.value.length === 0),
  ]
})
</script>
