<template>
  <!-- 工业语境：动态增减点检项 -->
  <doc-page gray title="添加/删除表单项">
    <s-form ref="formRef" :model="dynamicValidateForm">
      <s-form-item
        name="email"
        label="报警接收邮箱"
        :rules="[
          {
            required: true,
            message: '请输入报警接收邮箱',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <s-input v-model="dynamicValidateForm.email" />
      </s-form-item>
      <s-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="`抄送人 ${index + 1}`"
        :name="['domains', index, 'value']"
        :rules="{
          required: true,
          message: '请填写抄送人工号',
        }"
      >
        <div style="display: flex; flex-direction: row; gap: 5px">
          <s-input v-model="domain.value" />
          <s-button variant="text" color="danger" @click.prevent="removeDomain(domain)" #icon>
            <Trash />
          </s-button>
        </div>
      </s-form-item>
      <s-form-item>
        <s-button @click="submitForm(formRef)">提交</s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="addDomain">
          新增抄送人
        </s-button>
        <s-button variant="outlined" style="margin-top: 10px" @click="resetForm(formRef)">
          重置
        </s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormExpose } from 'sard'
import { Trash } from '@sard/icons'

const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{
  domains: DomainItem[]
  email: string
}>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
  email: '',
})

interface DomainItem {
  key: number
  value: string
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl
    .validate()
    .then(() => {
      toast('报警通知配置已保存')
      console.log('Success!')
    })
    .catch(() => {
      console.log('error submit!')
    })
}

const resetForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl.reset()
}
</script>
