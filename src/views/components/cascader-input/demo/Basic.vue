<template>
  <s-list card>
    <s-list-item>
      <s-cascader-input
        v-model="value"
        title="请选择省市区"
        placeholder="请选择省市区"
        clearable
        :options="options"
        :option-keys="optionKeys"
        :loading="loading"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为：440111 (广东省/广州市/白云区)"
      arrow
      hover
      @click="value = 440111"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData, type Node } from 'region-data'

const regionData = getRegionData()

const options = ref<Node[]>([])
const loading = ref(true)

setTimeout(() => {
  options.value = regionData
  loading.value = false
}, 1500)

const value = ref<number | undefined>(440111)

const optionKeys = { label: 'name', value: 'code' }

const onChange = (value: any, selectedOptions: any) => {
  console.log('change', value, selectedOptions)
}
</script>
