<template>
  <s-list card>
    <s-list-item title="显示文本">
      <template #value>
        <s-switch v-model="displayValue" />
      </template>
    </s-list-item>
    <s-list-item title="加粗">
      <template #value>
        <s-switch v-model="bold" />
      </template>
    </s-list-item>
    <s-list-item title="倾斜">
      <template #value>
        <s-switch v-model="italic" />
      </template>
    </s-list-item>
    <s-list-item title="字号">
      <template #value>
        <s-slider v-model="fontSize" :min="10" :max="30" style="width: 250px" />
      </template>
    </s-list-item>
    <s-list-item title="文本边距">
      <template #value>
        <s-slider v-model="textMargin" :min="0" :max="30" style="width: 250px" />
      </template>
    </s-list-item>
    <s-list-item>
      <s-segmented v-model="textPosition" :options="textPositionOptions" />
    </s-list-item>
    <s-list-item>
      <s-segmented v-model="textAlign" :options="textAlignOptions" />
    </s-list-item>
    <s-list-item>
      <s-barcode
        value="123456789012"
        :display-value="displayValue"
        :text-position="textPosition"
        :text-align="textAlign"
        :font-style="italic ? 'italic' : 'normal'"
        :font-weight="bold ? 'bold' : 'normal'"
        font-family="Arial"
        :font-size="fontSize"
        :text-margin="textMargin"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BarcodeTextPosition, type CanvasTextAlign } from 'sard'

const textPositionOptions: BarcodeTextPosition[] = ['top', 'bottom']
const textAlignOptions: CanvasTextAlign[] = ['left', 'center', 'right']

const displayValue = ref(true)
const textPosition = ref<BarcodeTextPosition>('bottom')
const textAlign = ref<CanvasTextAlign>('center')

const bold = ref(false)
const italic = ref(false)
const fontSize = ref(18)
const textMargin = ref(5)
</script>
