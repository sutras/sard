<template>
  <s-dropdown>
    <s-dropdown-item :options="options1" model-value="1" />
    <s-dropdown-item title="筛选" v-model:visible="visible">
      <s-list inlaid>
        <s-list-item title="包邮">
          <template #value>
            <s-switch :model-value="true" />
          </template>
        </s-list-item>
        <s-list-item title="团购">
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
    label: '距离优先',
    value: '1',
  },
  {
    label: '速度优先',
    value: '2',
  },
  {
    label: '评分优先',
    value: '3',
  },
]

const visible = ref(false)
</script>
