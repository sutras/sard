<template>
  <doc-page gray title="登录框">
    <s-form :model="formState" ref="formRef">
      <s-form-item
        label="操作员工号"
        name="username"
        :rules="[{ required: true, message: '请输入工号（例 A-1042）' }]"
      >
        <s-input v-model="formState.username">
          <template #prepend>
            <demo-icon name="user" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item
        label="班组长授权码"
        name="password"
        :rules="[{ required: true, message: '请输入 6 位动态授权码' }]"
      >
        <s-input type="password" v-model="formState.password">
          <template #prepend>
            <demo-icon name="key" />
          </template>
        </s-input>
      </s-form-item>

      <s-form-item>
        <s-flex justify="between" gap="medium">
          <s-form-item name="remember" inlaid>
            <s-checkbox v-model:checked="formState.remember" class="my-auto">
              本班次内免授权
            </s-checkbox>
          </s-form-item>
          <s-button variant="link">找回授权码</s-button>
        </s-flex>
      </s-form-item>

      <s-form-item>
        <s-button @click="submitForm" :disabled="disabled">受控登录</s-button>
        <s-flex align="center" justify="end" gap="medium">
          <span>或</span>
          <s-button variant="link">申请账号开通</s-button>
        </s-flex>
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
      toast('授权通过，有效期至本班次结束')
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
