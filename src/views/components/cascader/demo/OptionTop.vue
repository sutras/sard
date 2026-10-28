<template>
  <!-- 工业语境：组织与设备层级级联｜OptionTop 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-cascader
        :options="regionData"
        :field-keys="{ label: 'name', value: 'code' }"
        @update:modelValue="onChange"
      >
        <template #top="{ tabIndex }">
          <div
            :style="{
              padding: '8px 16px',
              backgroundColor: 'rgba(var(--s-color-primary-rgb), 0.1)',
              color: 'var(--s-color-primary)',
            }"
          >
            当前为第{{ tabIndex + 1 }}级
          </div>
        </template>
      </s-cascader>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { plantTree, type PlantNode as Node } from '@/data/plant-tree'
import { toast } from 'sard'

const regionData = plantTree

const onChange = (_: any, selectedOptions: Node[]) => {
  toast(selectedOptions.map((option) => option.name).join('/'))
}
</script>
