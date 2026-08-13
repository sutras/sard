<template>
  <s-select-popout v-model="value" v-model:visible="visible" title="请选择" @change="onChange">
    <div class="grid grid-cols-2 gap-2 px-4 pb-2">
      <s-select-option
        v-for="item in colors"
        :key="item.value"
        :value="item.value"
        plain
        #default="{ selected }"
      >
        <s-button block variant="outlined" :color="selected ? 'primary' : 'secondary'">
          <div class="size-6 rounded-sm" :style="{ background: item.value }"></div>
          <div class="ms-2 w-16 text-start">{{ item.label }}</div>
        </s-button>
      </s-select-option>
    </div>
  </s-select-popout>

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '请选择' }}
      </template>
    </s-list-item>
    <s-list-item title="设置为：#FFDE0A (yellow)" arrow hover @click="value = '#FFDE0A'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colors = [
  {
    value: '#E63415',
    label: 'red',
  },
  {
    value: '#FF6600',
    label: 'orange',
  },
  {
    value: '#FFDE0A',
    label: 'yellow',
  },
  {
    value: '#1EC79D',
    label: 'green',
  },
  {
    value: '#14CCCC',
    label: 'cyan',
  },
  {
    value: '#4167F0',
    label: 'blue',
  },
]

const visible = ref(false)
const value = ref<string>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
