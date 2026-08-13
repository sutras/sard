<template>
  <s-select-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    multiple
    show-toolbar
    :multiple-limit="3"
    @change="onChange"
  >
    <s-select-option
      v-for="item in regionData"
      :key="item.code"
      :label="item.name"
      :value="item.code"
    />
  </s-select-popout>

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '请选择' }}
      </template>
    </s-list-item>
    <s-list-item
      title="设置为：[440000, 450000] (广东省，广西)"
      arrow
      hover
      @click="value = [440000, 450000]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const visible = ref(false)
const value = ref<number[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
