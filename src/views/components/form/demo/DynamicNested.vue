<template>
  <doc-page gray title="动态增减嵌套字段">
    <s-form ref="formRef" :model="dynamicValidateForm">
      <s-form-item v-for="(user, index) in dynamicValidateForm.users" :key="user.id">
        <s-flex align="center" gap="medium">
          <s-form-item
            :name="['users', index, 'first']"
            :rules="{
              required: true,
              message: '请填写操作员工号',
            }"
            inlaid
          >
            <s-input inlaid v-model="user.first" placeholder="操作员工号" />
          </s-form-item>
          <s-form-item
            :name="['users', index, 'last']"
            :rules="{
              required: true,
              message: '请填写班组长授权码',
            }"
            inlaid
          >
            <s-input inlaid v-model="user.last" placeholder="班组长授权码" />
          </s-form-item>
          <s-button variant="text" size="small" color="danger" @click="removeUser(user)" #icon>
            <Trash />
          </s-button>
        </s-flex>
      </s-form-item>
      <s-form-item>
        <s-button variant="outlined" @click="addUser()">
          <template #icon>
            <Plus />
          </template>
          添加协同人
        </s-button>
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">提交协同人</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { toRaw, reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard'
import { Plus, Trash } from '@sard/icons'

interface User {
  first: string
  last: string
  id: number
}
const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{ users: User[] }>({
  users: [],
})
const removeUser = (item: User) => {
  const index = dynamicValidateForm.users.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.users.splice(index, 1)
  }
}
const addUser = () => {
  dynamicValidateForm.users.push({
    first: '',
    last: '',
    id: Date.now(),
  })
}

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('协同人已保存，工单进入授权队列')
      console.log('Received values of form:', toRaw(dynamicValidateForm))
    })
    .catch(() => {
      console.log('fail')
    })
}
</script>
