<template>
  <s-list card>
    <s-list-item>
      <s-picker v-model="value" :columns="columns" />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为: 包装五线 / 晚班"
      arrow
      hover
      @click="value = ['包装五线', '晚班']"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  ['机加工一线', '注塑二线', '压铸四线', '包装五线'],
  ['早班', '中班', '晚班'],
]

const value = ref<string[] | undefined>(['注塑二线', '中班'])
</script>
