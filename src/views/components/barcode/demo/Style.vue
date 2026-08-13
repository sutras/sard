<template>
  <s-list card>
    <s-list-item title="模块宽度">
      <template #value>
        <s-slider v-model="moduleWidth" :min="2" :max="6" show-scale style="width: 250px" />
      </template>
    </s-list-item>
    <s-list-item title="模块高度">
      <template #value>
        <s-slider v-model="moduleHeight" :min="10" :max="100" style="width: 250px" />
      </template>
    </s-list-item>
    <s-list-item title="条颜色">
      <template #value>
        <div style="width: 250px">
          <s-color-picker-input v-model="color" show-alpha show-presets clearable />
        </div>
      </template>
    </s-list-item>
    <s-list-item title="背景色">
      <template #value>
        <div style="width: 250px">
          <s-color-picker-input v-model="background" show-alpha show-presets clearable />
        </div>
      </template>
    </s-list-item>
    <s-list-item>
      <s-barcode
        value="123456789012"
        :width="moduleWidth"
        :height="moduleHeight"
        :background="background"
        :color="color"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const moduleWidth = ref(2)
const moduleHeight = ref(100)
const color = ref('#000')
const background = ref('#d3e4ff')
</script>
