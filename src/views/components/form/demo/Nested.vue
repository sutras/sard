<template>
  <doc-page gray title="嵌套结构与校验信息">
    <s-form :model="formState" ref="formRef">
      <s-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
        <s-input v-model="formState.user.name" />
      </s-form-item>
      <s-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }]">
        <s-input v-model="formState.user.email" />
      </s-form-item>
      <s-form-item
        :name="['user', 'age']"
        label="Age"
        :rules="[{ type: 'number', min: 0, max: 99 }]"
      >
        <s-stepper v-model="formState.user.age" />
      </s-form-item>
      <s-form-item :name="['user', 'website']" label="Website">
        <s-input v-model="formState.user.website" />
      </s-form-item>
      <s-form-item :name="['user', 'introduction']" label="Introduction">
        <s-input type="textarea" v-model="formState.user.introduction" />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Submit</s-button>
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
      toast('Success')
      console.log('Success:', toRaw(formState))
    })
    .catch(() => {
      toast('fail!')
    })
}
</script>
