<template>
  <s-list card>
    <s-list-item>
      <s-picker v-model="value" :columns="columns" @change="onChange" />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为: 包装五线" arrow hover @click="value = '包装五线'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ['机加工一线', '注塑二线', '压铸四线', '包装五线']

const value = ref<string | undefined>('注塑二线')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
