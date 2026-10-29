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
    <s-list-item title="设置为: 包装五线" arrow hover @click="value = 1004" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { code: 1001, name: '机加工一线' },
  { code: 1002, name: '注塑二线' },
  { code: 1003, name: '压铸四线' },
  { code: 1004, name: '包装五线' },
]

const value = ref<number | undefined>(1002)
</script>
