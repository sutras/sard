<template>
  <doc-page gray title="嵌套结构与校验信息">
    <s-form :model="formState" ref="formRef">
      <s-form-item :name="['user', 'name']" label="操作员" :rules="[{ required: true }]">
        <s-input v-model="formState.user.name" />
      </s-form-item>
      <s-form-item :name="['user', 'email']" label="接收报警邮箱" :rules="[{ type: 'email' }]">
        <s-input v-model="formState.user.email" />
      </s-form-item>
      <s-form-item
        :name="['user', 'age']"
        label="年龄（岁）"
        :rules="[{ type: 'number', min: 0, max: 99 }]"
      >
        <s-stepper v-model="formState.user.age" />
      </s-form-item>
      <s-form-item :name="['user', 'website']" label="技能档案">
        <s-input v-model="formState.user.website" />
      </s-form-item>
      <s-form-item :name="['user', 'introduction']" label="交接备注">
        <s-input type="textarea" v-model="formState.user.introduction" />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">保存操作员档案</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose } from 'sard'

const formRef = ref<FormExpose>()

const formState = reactive({
  user: {
    name: '',
    age: undefined,
    email: '',
    website: '',
    introduction: '',
  },
})

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('操作员档案已保存')
      console.log('Success:', toRaw(formState))
    })
    .catch(() => {
      toast('保存失败，请检查必填项')
    })
}
</script>
