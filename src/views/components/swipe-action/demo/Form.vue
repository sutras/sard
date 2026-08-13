<template>
  <s-form ref="formRef" :model="dynamicValidateForm" card>
    <s-swipe-action-group>
      <s-form-item
        v-for="(user, index) in dynamicValidateForm.users"
        :key="user.id"
        style="padding: 1px 0 0"
      >
        <s-swipe-action>
          <s-form-item>
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
            </s-space>
          </s-form-item>

          <template #right>
            <s-button color="danger" square auto-height @click="removeUser(user)">删除</s-button>
          </template>
        </s-swipe-action>
      </s-form-item>
    </s-swipe-action-group>

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
</template>

<script setup lang="ts">
import { toRaw, reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard'
import { Plus } from '@sard/icons'

interface User {
  first: string
  last: string
  id: number
}
const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{ users: User[] }>({
  users: [
    {
      first: '',
      last: '',
      id: 1,
    },
  ],
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
