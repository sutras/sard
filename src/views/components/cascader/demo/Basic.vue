<template>
  <s-list card>
    <s-list-item>
      <s-cascader
        v-model="value"
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
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
import { getRegionData } from 'region-data'
import { type CascaderOption } from 'sard'

const regionData = getRegionData()
const value = ref<number | undefined>(150102)

const onChange = (value: any, selectedOptions: CascaderOption[]) => {
  console.log('change', value, selectedOptions)
}
</script>
