<template>
  <doc-page gray title="登录框">
    <s-form :model="formState" ref="formRef">
      <s-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <s-input v-model="formState.username">
          <template #prepend>
            <demo-icon name="person" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <s-input type="password" v-model="formState.password">
          <template #prepend>
            <demo-icon name="key" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item>
        <s-space justify="between">
          <s-form-item name="remember" inlaid>
            <s-checkbox v-model:checked="formState.remember" class="my-auto">
              Remember me
            </s-checkbox>
          </s-form-item>
          <s-button variant="link">Forgot password</s-button>
        </s-space>
      </s-form-item>

      <s-form-item>
        <s-button @click="submitForm" :disabled="disabled">Log in</s-button>
        <s-space align="center" justify="end">
          <span>Or</span>
          <s-button variant="link">register now!</s-button>
        </s-space>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { reactive, computed, ref } from 'vue'
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
      toast('Success')
      console.log('Success:', formState)
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}

const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
