<template>
  <doc-page gray title="toast显示验证错误信息">
    <s-form ref="formRef" :model="formState" class="form" :show-error="false">
      <s-form-item
        name="username"
        class="form-item"
        :rules="[{ required: true, message: '请输入手机号!' }]"
      >
        <s-input v-model="formState.username" placeholder="请输入手机号" inlaid />
      </s-form-item>

      <s-form-item
        name="password"
        class="form-item"
        :rules="[{ required: true, message: '请输入短信验证码!' }]"
      >
        <s-space>
          <s-input
            v-model="formState.password"
            type="password"
            placeholder="请输入短信验证码"
            inlaid
            class="flex-1"
          />
          <s-button variant="link" compact>发送验证码</s-button>
        </s-space>
      </s-form-item>

      <s-form-item class="form-item">
        <s-button @click="submitForm" round>登录</s-button>
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
}

const formState = reactive<FormState>({
  username: '',
  password: '',
})

const submitForm = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success!')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0].message)
      console.log('Failed:', error)
    })
}
</script>
