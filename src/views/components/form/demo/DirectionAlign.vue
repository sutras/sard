<template>
  <doc-page gray title="方向与对齐">
    <doc-demo>
      <doc-title>排列方向</doc-title>
      <s-radio-group v-model="direction" direction="horizontal">
        <s-radio value="vertical">vertical</s-radio>
        <s-radio value="horizontal">horizontal</s-radio>
      </s-radio-group>

      <doc-title>水平对齐</doc-title>
      <s-radio-group v-model="labelAlign" direction="horizontal">
        <s-radio value="start">start</s-radio>
        <s-radio value="center">center</s-radio>
        <s-radio value="end">end</s-radio>
      </s-radio-group>

      <doc-title>垂直对齐</doc-title>
      <s-radio-group v-model="labelValign" direction="horizontal">
        <s-radio value="start">start</s-radio>
        <s-radio value="center">center</s-radio>
        <s-radio value="end">end</s-radio>
      </s-radio-group>

      <doc-title>星号位置</doc-title>
      <s-radio-group v-model="starPosition" direction="horizontal">
        <s-radio value="start">start</s-radio>
        <s-radio value="end">end</s-radio>
      </s-radio-group>
    </doc-demo>

    <doc-demo>
      <s-form
        label-width="100px"
        :direction="direction"
        :label-align="labelAlign"
        :label-valign="labelValign"
        :star-position="starPosition"
        :model="formLabelAlign"
        card
      >
        <s-form-item label="Name" required>
          <s-input v-model="formLabelAlign.name" />
        </s-form-item>
        <s-form-item label="Activity zone" required>
          <s-input v-model="formLabelAlign.region" />
        </s-form-item>
        <s-form-item label="Activity form" required>
          <s-input v-model="formLabelAlign.type" type="textarea" />
        </s-form-item>
      </s-form>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const labelAlign = ref<any>('start')
const labelValign = ref<any>('center')
const direction = ref<any>('horizontal')
const starPosition = ref<any>('start')

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>
