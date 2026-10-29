<template>
  <s-list card>
    <s-list-item>
      <s-cascader-input
        v-model="value"
        title="选择厂区 / 车间 / 产线 / 工位"
        placeholder="选择厂区 / 车间 / 产线 / 工位"
        clearable
        :options="options"
        :option-keys="optionKeys"
        :loading="loading"
        multiple
        all-levels
        check-strictly
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
import { ref } from 'vue'
import { plantTree, type PlantNode as Node } from '@/data/plant-tree'
import { type CascaderValue } from 'sard'

const regionData = plantTree

const options = ref<Node[]>([])
const loading = ref(true)

setTimeout(() => {
  options.value = regionData
  loading.value = false
}, 1500)

const value = ref<CascaderValue | undefined>([
  [1000, 1100, 1110, 1111],
  [1000, 1100, 1110, 1112],
])

const optionKeys = { label: 'name', value: 'code' }

const onChange = (value: any, selectedOptions: any) => {
  console.log('change', value, selectedOptions)
}
</script>
