<template>
  <s-list card>
    <s-list-item>
      <s-picker-input
        v-model="value"
        title="选择厂区 / 车间 / 产线 / 工位"
        placeholder="选择产线"
        :columns="regionData"
        :option-keys="{ label: 'name', value: 'code' }"
        clearable
      />
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

const value = ref<number[] | undefined>([3000, 3100, 3112])
</script>
