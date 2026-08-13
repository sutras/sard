<template>
  <doc-page gray title="多表单联动">
    <s-form ref="formRef" :model="formState" label-width="100px">
      <s-form-item
        name="group"
        label="Group Name"
        :rules="[{ required: true, message: 'Please input group name!' }]"
      >
        <s-input v-model="formState.group" />
      </s-form-item>

      <s-form-item label="User List">
        <template v-if="formState.users.length">
          <s-list inlaid>
            <template v-for="user in formState.users" :key="user.key">
              <s-list-item :title="`${user.name} - ${user.age}`" #icon>
                <s-avatar size="32px" icon-size="20px" />
              </s-list-item>
            </template>
          </s-list>
        </template>
        <template v-else>
          <span>( No user yet. )</span>
        </template>
      </s-form-item>

      <s-form-item>
        <s-button @click="onSubmit">Submit</s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="visible = true">
          Add User
        </s-button>
      </s-form-item>
    </s-form>

    <s-dialog v-model:visible="visible" title="Basic Drawer" :before-close="beforeClose">
      <s-form ref="modalFormRef" :model="modalFormState">
        <s-form-item name="name" label="User Name" :rules="[{ required: true }]">
          <s-input v-model="modalFormState.name" inlaid placeholder="Input User Name" />
        </s-form-item>
        <s-form-item name="age" label="User Age" :rules="[{ required: true }]">
          <s-stepper v-model="modalFormState.age" />
        </s-form-item>
      </s-form>
    </s-dialog>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

interface UserType {
  name?: string
  age?: number
  key?: number
}

interface FormState {
  group: string
  users: UserType[]
}

const formRef = ref<FormExpose>()
const modalFormRef = ref<FormExpose>()
const visible = ref(false)
const formState = reactive<FormState>({
  group: '',
  users: [],
})
const modalFormState = ref<UserType>({})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return modalFormRef.value?.validate().then(() => {
      formState.users.push({ ...modalFormState.value, key: Date.now() })
      modalFormRef.value?.reset()
    })
  }
}
const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Finish:', toRaw(formState))
      toast('Success')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('error', error)
    })
}
</script>
