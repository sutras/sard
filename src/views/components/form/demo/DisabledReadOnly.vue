<template>
  <doc-page gray title="表单只读和禁用">
    <s-list>
      <s-list-item title="只读">
        <template #value>
          <s-switch v-model="formReadonly" />
        </template>
      </s-list-item>
      <s-list-item title="禁用">
        <template #value>
          <s-switch v-model="formDisabled" />
        </template>
      </s-list-item>
    </s-list>

    <s-form :disabled="formDisabled" :readonly="formReadonly" label-width="100px">
      <s-form-item label="Checkbox">
        <s-checkbox-group v-model="checkboxValue">
          <s-checkbox value="apple">Apple</s-checkbox>
          <s-checkbox value="pear">Pear</s-checkbox>
        </s-checkbox-group>
      </s-form-item>
      <s-form-item label="Radio">
        <s-radio-group v-model="radioValue">
          <s-radio value="apple">Apple</s-radio>
          <s-radio value="pear">Pear</s-radio>
        </s-radio-group>
      </s-form-item>
      <s-form-item label="Input">
        <s-input />
      </s-form-item>
      <s-form-item label="Picker">
        <s-picker-input
          placeholder="Picker"
          :columns="[
            {
              label: 'Demo',
              value: 'demo',
            },
          ]"
        />
      </s-form-item>
      <s-form-item label="Cascader">
        <s-cascader-input placeholder="Cascader" :options="options" />
      </s-form-item>
      <s-form-item label="DatetimePicker">
        <s-datetime-picker-input placeholder="DatetimePicker" />
      </s-form-item>
      <s-form-item label="Calendar">
        <s-calendar-input placeholder="Calendar" type="range" />
      </s-form-item>
      <s-form-item label="Stepper">
        <s-stepper />
      </s-form-item>
      <s-form-item label="Input[Textarea]">
        <s-input type="textarea" />
      </s-form-item>
      <s-form-item label="PasswordInput">
        <s-password-input gap="0" model-value="123" style="height: 40px" />
      </s-form-item>
      <s-form-item label="Switch">
        <s-switch :model-value="true" />
      </s-form-item>
      <s-form-item label="Rate">
        <s-rate :model-value="3" />
      </s-form-item>
      <s-form-item label="Slider">
        <s-slider :model-value="50" />
      </s-form-item>
      <s-form-item label="Upload">
        <s-upload />
      </s-form-item>
      <s-form-item label="Button">
        <s-button>Button</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

const formDisabled = ref(true)
const formReadonly = ref(false)

const checkboxValue = ref(['apple'])
const radioValue = ref('apple')
const options = reactive([
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
    ],
  },
])
</script>
