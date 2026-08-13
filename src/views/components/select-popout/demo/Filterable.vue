<template>
  <s-select-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    filterable
    filter-placeholder="请输入过滤关键词"
    :filter-method="filterMethod"
    @change="onChange"
  >
    <s-select-option
      v-for="item in filteredData"
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
    <s-list-item title="设置为：440000 (广东省)" arrow hover @click="value = 440000" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'

const regionData = getRegionData()
const filteredData = ref(regionData)

const visible = ref(false)
const value = ref<number>()

const filterMethod = (query: string) => {
  filteredData.value = query ? regionData.filter((item) => item.name.includes(query)) : regionData
}

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
