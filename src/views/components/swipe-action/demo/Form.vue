<template>
  <!-- 工业语境：列表项滑动操作（确认 / 转派）｜Form 用法演示 -->
  <s-form ref="formRef" :model="dynamicValidateForm" card>
    <s-form-item
      v-for="(user, index) in dynamicValidateForm.users"
      :key="user.id"
      style="padding: 1px 0 0"
    >
      <s-swipe-action>
        <s-form-item>
          <s-flex align="center" gap="medium">
            <s-form-item
              :name="['users', index, 'first']"
              :rules="{
                required: true,
                message: 'Missing first name',
              }"
              inlaid
            >
              <s-input inlaid v-model="user.first" placeholder="操作员工号" />
            </s-form-item>
            <s-form-item
              :name="['users', index, 'last']"
              :rules="{
                required: true,
                message: 'Missing last name',
              }"
              inlaid
            >
              <s-input inlaid v-model="user.last" placeholder="班组长授权码" />
            </s-form-item>
          </s-flex>
        </s-form-item>

        <template #right>
          <s-button color="danger" square auto-height @click="removeUser(user)">解除</s-button>
        </template>
      </s-swipe-action>
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
      <s-button @click="on提交工单">提交工单</s-button>
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

const on提交工单 = () => {
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
