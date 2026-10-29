<template>
  <doc-page gray title="多表单联动">
    <s-form ref="formRef" :model="formState" label-width="100px">
      <s-form-item
        name="group"
        label="产线名称"
        :rules="[{ required: true, message: '请输入产线名称' }]"
      >
        <s-input v-model="formState.group" />
      </s-form-item>

      <s-form-item label="工位列表">
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
          <span>（暂未配置工位）</span>
        </template>
      </s-form-item>

      <s-form-item>
        <s-button @click="onSubmit">提交配置</s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="visible = true">
          新增工位
        </s-button>
      </s-form-item>
    </s-form>

    <s-dialog v-model:visible="visible" title="新增工位" :before-close="beforeClose">
      <s-form ref="modalFormRef" :model="modalFormState">
        <s-form-item name="name" label="工位编号" :rules="[{ required: true }]">
          <s-input v-model="modalFormState.name" inlaid placeholder="例 ST-04" />
        </s-form-item>
        <s-form-item name="age" label="单件节拍" :rules="[{ required: true }]">
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
      toast('产线工位配置已保存')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('error', error)
    })
}
</script>
