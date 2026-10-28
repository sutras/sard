<template>
  <!-- 工业语境：按厂区分组的产线选择，组内条目足够多，滚动时组标题会吸顶｜Basic 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-select v-model="value" @change="onChange">
        <s-select-option-group v-for="group in selectGroups" :key="group.code" :label="group.name">
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
    <s-list-item title="设置为：1110（机加车间 / 机加工一线）" arrow hover @click="value = 1110" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { plantTree } from '@/data/plant-tree'
import { ref } from 'vue'

const selectGroups = plantTree.map((plant) => ({
  code: plant.code,
  name: plant.name,
  children: (plant.children ?? []).flatMap((workshop) =>
    (workshop.children ?? []).map((line) => ({
      code: line.code,
      name: `${workshop.name} · ${line.name}`,
    })),
  ),
}))

const value = ref<number | undefined>(2110)

const onChange = (value: any) => {
  console.log('切换到产线', value)
}
</script>
