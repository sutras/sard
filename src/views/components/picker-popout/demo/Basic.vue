<template>
  <s-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    :columns="columns"
    @change="onChange"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </s-button>
    </s-list-item>
    <s-list-item title="设置为: 天津市" arrow hover @click="value = '天津市'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ['北京市', '天津市', '河北省', '山东省']

const visible = ref(false)
const value = ref<string | undefined>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
