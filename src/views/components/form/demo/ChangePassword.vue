<template>
  <doc-page gray title="修改密码">
    <s-form ref="formRef" :model="formState" class="auth-form" :show-error="false">
      <s-form-item
        name="oldPassword"
        :rules="[{ required: true, message: '请输入旧密码' }]"
        inlaid
        class="auth-form-item"
      >
        <s-input
          v-model="formState.oldPassword"
          type="password"
          placeholder="旧密码"
          inlaid
          class="auth-form-input"
        >
          <template #prepend>
            <demo-icon name="key" size="16px" color="var(--s-text-color-tertiary)" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item
        name="newPassword"
        :rules="[{ required: true, message: '请输入新密码' }]"
        inlaid
        class="auth-form-item"
      >
        <s-input
          v-model="formState.newPassword"
          type="password"
          placeholder="新密码"
          inlaid
          class="auth-form-input"
        >
          <template #prepend>
            <demo-icon name="key" size="16px" color="var(--s-text-color-tertiary)" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item inlaid>
        <s-button round :loading="submitting" @click="submitForm">提交</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

const formRef = ref<FormExpose>()

interface FormState {
  oldPassword: string
  newPassword: string
}

const formState = reactive<FormState>({
  oldPassword: '',
  newPassword: '',
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
      toast('修改成功')
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
