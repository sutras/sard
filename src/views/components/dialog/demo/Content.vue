<template>
  <s-list card>
    <s-list-item arrow hover title="登录表单" @click="visible = true" />
  </s-list>

  <s-dialog v-model:visible="visible" title="登录" :before-close="beforeClose">
    <s-form ref="formRef" :model="formState">
      <s-form-item name="name" label="用户名" :rules="[{ required: true }]">
        <s-input inlaid placeholder="请输入" v-model="formState.name" />
      </s-form-item>
      <s-form-item name="password" label="密码" :rules="[{ required: true }]">
        <s-input type="password" inlaid placeholder="请输入" v-model="formState.password" />
      </s-form-item>
    </s-form>
  </s-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'
import { reactive } from 'vue'

const visible = ref(false)

const formRef = ref()

const formState = reactive({
  name: '',
  password: '',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value?.validate().then(() => {
      toast(JSON.stringify(formState))
      formRef.value?.reset()
    })
  }
}
</script>
