<template>
  <doc-page gray title="动态增减嵌套字段">
    <s-form ref="formRef" :model="dynamicValidateForm">
      <s-form-item v-for="(user, index) in dynamicValidateForm.users" :key="user.id">
        <s-space align="center">
          <s-form-item
            :name="['users', index, 'first']"
            :rules="{
              required: true,
              message: 'Missing first name',
            }"
            inlaid
          >
            <s-input inlaid v-model="user.first" placeholder="First Name" />
          </s-form-item>
          <s-form-item
            :name="['users', index, 'last']"
            :rules="{
              required: true,
              message: 'Missing last name',
            }"
            inlaid
          >
            <s-input inlaid v-model="user.last" placeholder="Last Name" />
          </s-form-item>
          <s-button variant="text" size="small" color="danger" @click="removeUser(user)" #icon>
            <Trash />
          </s-button>
        </s-space>
      </s-form-item>
      <s-form-item>
        <s-button variant="outlined" @click="addUser()">
          <template #icon>
            <Plus />
          </template>
          Add user
        </s-button>
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Submit</s-button>
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
      toast('Success')
      console.log('Received values of form:', toRaw(dynamicValidateForm))
    })
    .catch(() => {
      console.log('fail')
    })
}
</script>
