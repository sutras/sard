<template>
  <s-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="请选择"
    :columns="regionData"
    :option-keys="{ label: 'name', value: 'code' }"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '请选择' }}
      </s-button>
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

const visible = ref(false)

const value = ref<number[] | undefined>([150000, 150500, 150522])
</script>
