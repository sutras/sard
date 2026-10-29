<template>
  <s-list card>
    <s-list-item>
      <s-picker v-model="value" :columns="columns" />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为: 包装五线 / 晚班" arrow hover @click="value = [1004, 3]" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  [
    { value: 1001, label: '机加工一线' },
    { value: 1002, label: '注塑二线' },
    { value: 1003, label: '压铸四线' },
    { value: 1004, label: '包装五线' },
  ],
  [
    { value: 1, label: '早班' },
    { value: 2, label: '中班' },
    { value: 3, label: '晚班' },
  ],
]

const value = ref<number[] | undefined>([1002, 2])
</script>
