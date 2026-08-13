<template>
  <s-list card>
    <s-list-item>
      <s-select v-model="value" @change="onChange">
        <s-select-option-group v-for="group in regionData" :key="group.code" :label="group.name">
          <s-select-option
            v-for="item in group.children"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </s-select-option-group>
      </s-select>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为：440100 (广州市)" arrow hover @click="value = 440100" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { getRegionData } from 'region-data'
import { ref } from 'vue'

const regionData = getRegionData().slice(16, 20)

const value = ref<number | undefined>(450100)

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
