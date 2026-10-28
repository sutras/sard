<template>
  <!-- 工业语境：产线选择弹层｜Basic 用法演示 -->
  <s-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线"
    :columns="columns"
    @change="onChange"
    @confirm="onConfirm"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '选择产线' }}
      </s-button>
    </s-list-item>
    <s-list-item title="设置为: 包装五线" arrow hover @click="value = '包装五线'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ['机加工一线', '注塑二线', '压铸四线', '包装五线']

const visible = ref(false)
const value = ref<string | undefined>()

const onChange = (value: any) => {
  console.log('change', value)
}

const onConfirm = (...args: any[]) => {
  console.log('confirm: ', ...args)
}
</script>
