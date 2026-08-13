<template>
  <doc-page gray title="手机号登录">
    <s-form ref="formRef" :model="formState" :show-error="false" class="auth-form">
      <s-form-item
        name="phone"
        :rules="[{ required: true, message: '请输入手机号码' }]"
        inlaid
        class="auth-form-item"
      >
        <s-input v-model="formState.phone" placeholder="手机号码" inlaid class="auth-form-input">
          <template #prepend>
            <demo-icon name="phone" size="16px" color="var(--s-text-color-tertiary)" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        inlaid
        class="auth-form-item"
      >
        <s-input
          v-model="formState.password"
          type="password"
          placeholder="密码"
          inlaid
          class="auth-form-input"
        >
          <template #prepend>
            <demo-icon name="key" size="16px" color="var(--s-text-color-tertiary)" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item inlaid>
        <s-button round :loading="submitting" @click="submitForm">登录</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

const formRef = ref<FormExpose>()

interface FormState {
  phone: string
  password: string
}

const formState = reactive<FormState>({
  phone: '',
  password: '',
})

const submitting = ref(false)

const submit = async () => {
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  submitting.value = false
}

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(async () => {
      await submit()
      toast('登录成功')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('Failed:', error)
    })
}
</script>

<style lang="scss" scoped>
.auth-form {
  padding: 16px;

  .auth-form-item {
    margin-bottom: 24px;
  }
  .auth-form-input {
    height: 40px;
    border-radius: 9999px;
    padding: 0 24px;
    background: rgba(var(--s-color-primary-rgb), 0.05);
  }
}
</style>
