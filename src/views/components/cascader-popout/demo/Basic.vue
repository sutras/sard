<template>
  <s-cascader-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择省市区"
    :options="regionData"
    :field-keys="{ label: 'name', value: 'code' }"
    @change="onChange"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </s-button>
    </s-list-item>
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
import { getRegionData } from 'region-data'
import { type CascaderOption } from 'sard'

const regionData = getRegionData()
const visible = ref(false)
const value = ref<number | undefined>(150102)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
