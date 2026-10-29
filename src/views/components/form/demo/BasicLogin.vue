<template>
  <doc-page gray title="简单登录框">
    <s-form :model="formState" ref="formRef">
      <s-form-item
        label="操作员工号"
        name="username"
        :rules="[{ required: true, message: '请输入操作员工号' }]"
      >
        <s-input v-model="formState.username" />
      </s-form-item>

      <s-form-item
        label="班组长授权码"
        name="password"
        :rules="[{ required: true, message: '请输入 6 位班组长授权码' }]"
      >
        <s-input type="password" v-model="formState.password" />
      </s-form-item>

      <s-form-item label="" name="remember">
        <s-checkbox v-model:checked="formState.remember">本班次内免重复授权</s-checkbox>
      </s-form-item>

      <s-form-item>
        <s-button @click="submitForm">受控登录</s-button>
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
      toast('授权通过，有效期至本班次结束')
      console.log('Success:', toRaw(formState))
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}
</script>
