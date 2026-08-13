<template>
  <s-list card>
    <s-list-item>
      <s-picker
        v-model="value"
        :columns="regionData"
        :option-keys="{ label: 'name', value: 'code' }"
      />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为: 广东省/广州市/白云区"
      arrow
      hover
      @click="value = [440000, 440100, 440111]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getRegionData } from 'region-data'

const regionData = getRegionData()

const value = ref<number[] | undefined>([150000, 150500, 150522])
</script>
