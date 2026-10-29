<template>
  <s-picker-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线"
    :columns="regionData"
    :option-keys="{ label: 'name', value: 'code' }"
    @confirm="onConfirm"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ value ? value : '选择厂区 / 车间 / 产线 / 工位' }}
      </s-button>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为: 华东厂区/机加车间/机加工一线/ST-04"
      arrow
      hover
      @click="value = [1000, 1100, 1110, 1112]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { plantTree } from '@/data/plant-tree'

const regionData = plantTree

const visible = ref(false)

const value = ref<number[] | undefined>([3000, 3100, 3112])

const onConfirm = (...args: any[]) => {
  console.log('confirm: ', ...args)
}
</script>
