<template>
  <!-- 工业语境：动态校验规则：按设备类型切换量程 -->
  <doc-page gray title="动态校验规则">
    <s-form ref="formRef" :model="formState">
      <s-form-item
        label="操作员工号"
        name="username"
        :rules="[{ required: true, message: '请输入操作员工号' }]"
      >
        <s-input v-model="formState.username" />
      </s-form-item>

      <s-form-item
        label="设备位号"
        name="nickname"
        :rules="[
          {
            required: formState.checkNick,
            message: '请输入设备位号',
          },
        ]"
      >
        <s-input v-model="formState.nickname" />
      </s-form-item>

      <s-form-item name="checkNick">
        <s-checkbox v-model:checked="formState.checkNick">设备位号必填</s-checkbox>
      </s-form-item>

      <s-form-item>
        <s-button @click="onCheck">校验</s-button>
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
      toast('校验通过，可提交工单')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('Failed:', error)
    })
}
</script>
