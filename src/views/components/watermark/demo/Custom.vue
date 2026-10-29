<template>
  <doc-page gray title="自定义绘制">
    <s-watermark
      class="fixed"
      :content="content"
      :font="{
        fontSize,
        textAlign,
        color,
      }"
      :z-index="9999"
      :gap="[gapX, gapY]"
      :offset="[offsetX, offsetY]"
      :rotate="rotate"
    />

    <s-form label-width="60px">
      <s-form-item label="textAlign">
        <s-segmented v-model="textAlign" :options="['left', 'center', 'right']" />
      </s-form-item>
      <s-form-item label="rotate">
        <s-slider v-model="rotate" :min="-180" :max="180" show-value />
      </s-form-item>
      <s-form-item label="fontSize">
        <s-slider v-model="fontSize" :min="1" :max="100" show-value />
      </s-form-item>
      <s-form-item label="gapX">
        <s-slider v-model="gapX" :min="-100" :max="100" show-value />
      </s-form-item>
      <s-form-item label="gapY">
        <s-slider v-model="gapY" :min="-100" :max="100" show-value />
      </s-form-item>
      <s-form-item label="offsetX">
        <s-slider v-model="offsetX" :min="-100" :max="100" show-value />
      </s-form-item>
      <s-form-item label="offsetY">
        <s-slider v-model="offsetY" :min="-100" :max="100" show-value />
      </s-form-item>
      <s-form-item label="content">
        <s-input v-model="strContent" type="textarea" />
      </s-form-item>
      <s-form-item label="color">
        <s-color-picker-input v-model="color" show-alpha show-presets />
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const rotate = ref(-22)
const fontSize = ref(14)
const gapX = ref(30)
const gapY = ref(30)
const offsetX = ref(gapX.value / 2)
const offsetY = ref(gapY.value / 2)
const textAlign = ref('center')
const strContent = ref('Sard\nVue3 + TS')
const content = computed(() =>
  strContent.value
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((item) => item.trim()),
)
const color = ref('rgba(128,128,128,.3)')
</script>
