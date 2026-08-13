<template>
  <s-list card>
    <s-list-item>
      <s-picker
        v-model="value"
        :columns="columns"
        :option-keys="{ label: 'name', value: 'code' }"
      />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为: 天津市" arrow hover @click="value = 120000" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  {
    code: 110000,
    name: '北京市',
  },
  {
    code: 120000,
    name: '天津市',
  },
  {
    code: 130000,
    name: '河北省',
  },
  {
    code: 140000,
    name: '山东省',
  },
]

const value = ref<number | undefined>(130000)
</script>
