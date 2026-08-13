<template>
  <s-list card>
    <s-list-item>
      <s-select-input
        v-model="value"
        title="请选择"
        placeholder="请选择"
        clearable
        :options="colors"
        @change="onChange"
      >
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
      </s-select-input>
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
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

const value = ref<string>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
