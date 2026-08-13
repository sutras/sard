<template>
  <doc-page gray title="简单登录框">
    <s-form :model="formState" ref="formRef">
      <s-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <s-input v-model="formState.username" />
      </s-form-item>

      <s-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <s-input type="password" v-model="formState.password" />
      </s-form-item>

      <s-form-item label="" name="remember">
        <s-checkbox v-model:checked="formState.remember">Remember me</s-checkbox>
      </s-form-item>

      <s-form-item>
        <s-button @click="submitForm">Submit</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

const formRef = ref<FormExpose>()

interface FormState {
  username: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success!')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}
</script>
