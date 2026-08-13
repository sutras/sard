<template>
  <doc-page gray title="弹出层中的新建表单">
    <div class="mx-4">
      <s-button block @click="visible = true">New Collection</s-button>
    </div>
    <s-dialog
      v-model:visible="visible"
      title="Create a new collection"
      :headed="false"
      confirm-text="Create"
      cancel-text="Cancel"
      :before-close="beforeClose"
    >
      <s-form ref="formRef" :model="formState">
        <s-form-item
          name="title"
          label="Title"
          :rules="[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]"
        >
          <s-input v-model="formState.title" />
        </s-form-item>
        <s-form-item name="description" label="Description">
          <s-input type="textarea" v-model="formState.description" />
        </s-form-item>
        <s-form-item name="modifier">
          <s-radio-group v-model="formState.modifier" direction="horizontal" class="ms-auto">
            <s-radio value="public">Public</s-radio>
            <s-radio value="private">Private</s-radio>
          </s-radio-group>
        </s-form-item>
      </s-form>
      <div style="margin-bottom: 10px"></div>
    </s-dialog>
  </doc-page>
</template>
<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import { toast, type FormExpose, type FieldValidateError } from 'sard'

interface Values {
  title: string
  description: string
  modifier: string
}

const formRef = ref<FormExpose>()
const visible = ref(false)

const formState = reactive<Values>({
  title: '',
  description: '',
  modifier: 'public',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value
      ?.validate()
      .then(() => {
        toast(JSON.stringify(formState))
        console.log('formState: ', toRaw(formState))
        formRef.value?.reset()
      })
      .catch((error: FieldValidateError[]) => {
        console.log('Validate Failed:', error)
        throw error
      })
  }
}
</script>
