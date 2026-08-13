<template>
  <s-list card>
    <s-list-item>
      <s-select-input
        v-model="value"
        title="请选择"
        placeholder="请选择"
        clearable
        :options="regionData"
        :option-keys="{ label: 'name', value: 'code', children: '' }"
        @change="onChange"
      />
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为：440000 (广东省)" arrow hover @click="value = 440000" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const value = ref<number>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
