<template>
  <s-list card>
    <s-list-item>
      <s-cascader-input
        v-model="value"
        title="选择厂区 / 车间 / 产线 / 工位"
        placeholder="选择厂区 / 车间 / 产线 / 工位"
        clearable
        :field-keys="{ label: 'name', value: 'code', isLeaf: 'isLeaf' }"
        lazy
        :load="loadNode"
        multiple
        all-levels
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值：">
      <template #value>
        <div class="line-clamp-3">
          {{ JSON.stringify(value) ?? 'undefined' }}
        </div>
      </template>
    </s-list-item>
    <s-list-item
      title="设置为：[[1000, 1100, 1110, 1111], [1000, 1100, 1110, 1112]]（ST-01、ST-04）"
      arrow
      hover
      @click="
        value = [
          [1000, 1100, 1110, 1111],
          [1000, 1100, 1110, 1112],
        ]
      "
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { findPlantNode, plantTree } from '@/data/plant-tree'
import { type CascaderValue, type CascaderOption, type CascaderStateNode } from 'sard'
import { ref } from 'vue'

const doGetTreeData = (parentId?: number) => {
  const nodes = parentId ? (findPlantNode(parentId)?.children ?? []) : plantTree

  return nodes.map(({ code, name, children }) => ({ code, name, isLeaf: !children }))
}

const getTreeData = (parentId?: number) => {
  return new Promise<ReturnType<typeof doGetTreeData>>((resolve, reject) => {
    setTimeout(() => {
      try {
        const treeData = doGetTreeData(parentId)
        resolve(treeData)
      } catch {
        reject()
      }
    }, 500)
  })
}

const value = ref<CascaderValue | undefined>([
  [1000, 1100, 1110, 1111],
  [1000, 1100, 1110, 1112],
])

const loadNode = async (node?: CascaderStateNode) => {
  return await getTreeData(node?.key as number)
}

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
