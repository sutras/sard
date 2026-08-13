<template>
  <doc-page gray title="Fab 悬浮按钮">
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
      <Color v-if="currentDemo === 'Color'" />
      <HideName v-if="currentDemo === 'HideName'" />
      <TopLeft v-if="currentDemo === 'TopLeft'" />
      <TopRight v-if="currentDemo === 'TopRight'" />
      <BottomLeft v-if="currentDemo === 'BottomLeft'" />
      <Icon v-if="currentDemo === 'Icon'" />
      <Draggable v-if="currentDemo === 'Draggable'" />
      <Magnet v-if="currentDemo === 'Magnet'" />
      <Offset v-if="currentDemo === 'Offset'" />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Basic from './demo/Basic.vue'
import Color from './demo/Color.vue'
import HideName from './demo/HideName.vue'
import TopLeft from './demo/TopLeft.vue'
import TopRight from './demo/TopRight.vue'
import BottomLeft from './demo/BottomLeft.vue'
import Icon from './demo/Icon.vue'
import Draggable from './demo/Draggable.vue'
import Magnet from './demo/Magnet.vue'
import Offset from './demo/Offset.vue'

const currentDemo = ref('Basic')

const demoOptions = [
  { value: 'Basic', label: '基础用法' },
  { value: 'Color', label: '自定义颜色' },
  { value: 'HideName', label: '隐藏按钮名称' },
  { value: 'TopLeft', label: '左上角显示' },
  { value: 'TopRight', label: '右上角显示' },
  { value: 'BottomLeft', label: '左下角显示' },
  { value: 'Icon', label: '自定义图标' },
  { value: 'Draggable', label: '可拖拽的' },
  { value: 'Magnet', label: '自由拖拽和磁吸' },
  { value: 'Offset', label: '双向绑定' },
]
</script>
