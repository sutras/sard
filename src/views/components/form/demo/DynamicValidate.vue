<template>
  <doc-page gray title="动态校验规则">
    <s-form ref="formRef" :model="formState">
      <s-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <s-input v-model="formState.username" />
      </s-form-item>

      <s-form-item
        label="Nickname"
        name="nickname"
        :rules="[
          {
            required: formState.checkNick,
            message: 'Please input your nickname!',
          },
        ]"
      >
        <s-input v-model="formState.nickname" />
      </s-form-item>

      <s-form-item name="checkNick">
        <s-checkbox v-model:checked="formState.checkNick">Nickname is required</s-checkbox>
      </s-form-item>

      <s-form-item>
        <s-button @click="onCheck">Check</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref, watch, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

interface FormState {
  username: string
  nickname: string
  checkNick: boolean
}
const formRef = ref<FormExpose>()
const formState = reactive<FormState>({
  username: '',
  nickname: '',
  checkNick: false,
})

watch(
  () => formState.checkNick,
  () => {
    formRef.value?.validate(['nickname']).catch(() => void 0)
  },
  { flush: 'post' },
)

const onCheck = async () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Success:', toRaw(formState))
      toast('success')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}
</script>
