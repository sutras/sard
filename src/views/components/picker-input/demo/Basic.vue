<template>
  <s-list card>
    <s-list-item>
      <s-picker-input
        v-model="value"
        title="请选择性别"
        placeholder="请选择性别"
        clearable
        :columns="columns"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为：female (女性)" arrow hover @click="value = 'female'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string>()

const columns = [
  {
    value: 'male',
    label: '男性',
  },
  {
    value: 'female',
    label: '女性',
  },
  {
    value: 'others',
    label: '其他',
  },
]

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
