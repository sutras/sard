<template>
  <s-dropdown>
    <s-dropdown-item :options="options1" model-value="1" />
    <s-dropdown-item title="按产线筛选" v-model:visible="visible">
      <s-list inlaid>
        <s-list-item title="仅本班次">
          <template #value>
            <s-switch :model-value="true" />
          </template>
        </s-list-item>
        <s-list-item title="仅报警设备">
          <template #value>
            <s-switch />
          </template>
        </s-list-item>
        <s-list-item>
          <s-button round @click="visible = false">确认</s-button>
        </s-list-item>
      </s-list>
    </s-dropdown-item>
  </s-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options1 = [
  {
    label: '本班次',
    value: '1',
  },
  {
    label: '主轴转速优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]

const visible = ref(false)
</script>
