<template>
  <doc-page gray title="FloatingBubble 浮动气泡">
    <doc-demo>
      <s-radio-group v-model="currentDemo" #default="{ toggle }">
        <s-list card>
          <s-list-item
            v-for="option in demoOptions"
            :key="option.value"
            :title="option.label"
            hover
            @click="toggle(option.value)"
          >
            <template #value>
              <s-radio readonly :value="option.value" />
            </template>
          </s-list-item>
        </s-list>
      </s-radio-group>

      <Basic v-if="currentDemo === 'Basic'" />
      <Magnet v-else-if="currentDemo === 'Magnet'" />
      <Offset v-else-if="currentDemo === 'Offset'" />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Basic from './demo/Basic.vue'
import Magnet from './demo/Magnet.vue'
import Offset from './demo/Offset.vue'

const currentDemo = ref('Basic')

const demoOptions = [
  { value: 'Basic', label: '基础用法' },
  { value: 'Magnet', label: '自由拖拽和磁吸' },
  { value: 'Offset', label: '双向绑定' },
]
</script>
