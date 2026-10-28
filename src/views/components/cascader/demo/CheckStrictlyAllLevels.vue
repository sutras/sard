<template>
  <!-- 工业语境：组织与设备层级级联｜CheckStrictlyAllLevels 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
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
import { plantTree } from '@/data/plant-tree'
import { type CascaderOption, type CascaderValue } from 'sard'

const regionData = plantTree
const value = ref<CascaderValue | undefined>([
  [1000, 1100, 1110, 1111],
  [1000, 1100, 1110, 1112],
])

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
