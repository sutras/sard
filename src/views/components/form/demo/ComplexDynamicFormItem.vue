<template>
  <doc-page gray title="复杂的动态增减表单项">
    <s-form ref="formRef" :model="dynamicValidateForm">
      <s-form-item name="area" label="车间" :rules="[{ required: true, message: '请选择车间' }]">
        <s-picker-input
          v-model="dynamicValidateForm.area"
          placeholder="选择车间"
          :columns="areas"
        />
      </s-form-item>
      <s-form-item v-for="(sight, index) in dynamicValidateForm.sights" :key="sight.id">
        <s-flex align="center" gap="medium">
          <s-form-item
            :name="['sights', index, 'value']"
            label="产线"
            label-width="50px"
            :rules="{
              required: true,
              message: '请选择产线',
            }"
            inlaid
          >
            <s-picker-input
              v-model="sight.value"
              placeholder="选择产线"
              :disabled="!dynamicValidateForm.area"
              :columns="
                (sights[dynamicValidateForm.area] || []).map((a) => ({
                  value: a,
                  label: a,
                }))
              "
            />
          </s-form-item>
          <s-form-item
            :name="['sights', index, 'price']"
            label="节拍"
            label-width="50px"
            :rules="{
              required: true,
              message: '请填写单件节拍',
            }"
            inlaid
          >
            <s-input inlaid placeholder="例 72（s）" v-model="sight.price" />
          </s-form-item>
          <s-button variant="text" size="small" color="danger" @click="removeSight(sight)" #icon>
            <Trash />
          </s-button>
        </s-flex>
      </s-form-item>
      <s-form-item>
        <s-button variant="outlined" @click="addSight()">
          <template #icon>
            <Plus />
          </template>
          新增产线
        </s-button>
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">提交工艺路线</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { toRaw } from 'vue'
import { reactive, ref, watch } from 'vue'
import { toast, type FormExpose } from 'sard'
import { Plus, Trash } from '@sard/icons'

interface Sights {
  value: string
  price: string
  id: number
}
const areas = [
  { label: '机加车间', value: '机加车间' },
  { label: '注塑车间', value: '注塑车间' },
]

const sights: { [key: string]: string[] } = {
  机加车间: ['机加工一线', '机加工二线'],
  注塑车间: ['注塑一线', '注塑二线'],
}

const formRef = ref<FormExpose>()
const dynamicValidateForm = reactive<{ sights: Sights[]; area: string }>({
  sights: [],
  area: '',
})

watch(
  () => dynamicValidateForm.area,
  () => {
    dynamicValidateForm.sights = []
  },
)

const removeSight = (item: Sights) => {
  const index = dynamicValidateForm.sights.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.sights.splice(index, 1)
  }
}
const addSight = () => {
  dynamicValidateForm.sights.push({
    value: '',
    price: '',
    id: Date.now(),
  })
}

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      console.log('Received values of form:', toRaw(dynamicValidateForm))
      toast('工艺路线已保存，等待班组长确认')
    })
    .catch(() => {
      console.log('fail')
    })
}
</script>
