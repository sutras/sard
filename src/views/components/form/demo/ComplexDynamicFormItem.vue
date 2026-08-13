<template>
  <doc-page gray title="复杂的动态增减表单项">
    <s-form ref="formRef" :model="dynamicValidateForm">
      <s-form-item name="area" label="Area" :rules="[{ required: true, message: 'Missing area' }]">
        <s-picker-input v-model="dynamicValidateForm.area" placeholder="Area" :columns="areas" />
      </s-form-item>
      <s-form-item v-for="(sight, index) in dynamicValidateForm.sights" :key="sight.id">
        <s-space align="center">
          <s-form-item
            :name="['sights', index, 'value']"
            label="Sight"
            label-width="50px"
            :rules="{
              required: true,
              message: 'Missing sight',
            }"
            inlaid
          >
            <s-picker-input
              v-model="sight.value"
              placeholder="Sight"
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
            label="Price"
            label-width="50px"
            :rules="{
              required: true,
              message: 'Missing price',
            }"
            inlaid
          >
            <s-input inlaid placeholder="Price" v-model="sight.price" />
          </s-form-item>
          <s-button variant="text" size="small" color="danger" @click="removeSight(sight)" #icon>
            <Trash />
          </s-button>
        </s-space>
      </s-form-item>
      <s-form-item>
        <s-button variant="outlined" @click="addSight()">
          <template #icon>
            <Plus />
          </template>
          Add sights
        </s-button>
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Submit</s-button>
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
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

const sights: { [key: string]: string[] } = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
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
      toast('success')
    })
    .catch(() => {
      console.log('fail')
    })
}
</script>
