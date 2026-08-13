<template>
  <doc-page gray title="Label 宽度">
    <s-form :model="formState" ref="formRef" label-width="100px">
      <s-form-item label="Activity name">
        <s-input v-model="formState.name" />
      </s-form-item>
      <s-form-item label="Instant delivery">
        <s-switch v-model="formState.delivery" />
      </s-form-item>
      <s-form-item label="Activity type">
        <s-checkbox-group v-model="formState.type">
          <s-checkbox value="1">Online</s-checkbox>
          <s-checkbox value="2">Promotion</s-checkbox>
          <s-checkbox value="3">Offline</s-checkbox>
        </s-checkbox-group>
      </s-form-item>
      <s-form-item label="Resources">
        <s-radio-group v-model="formState.resource">
          <s-radio value="1">Sponsor</s-radio>
          <s-radio value="2">Venue</s-radio>
        </s-radio-group>
      </s-form-item>
      <s-form-item label="Activity form">
        <s-input type="textarea" v-model="formState.desc" />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Create</s-button>
        <s-button variant="outlined" style="margin-top: 10px">Cancel</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { reactive, toRaw, ref, type UnwrapRef } from 'vue'
import { type FormExpose } from 'sard'

const formRef = ref<FormExpose>()

interface FormState {
  name: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('submit!', toRaw(formState))
  })
}
</script>
