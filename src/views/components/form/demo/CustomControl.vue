<template>
  <doc-page gray title="自定义表单控件">
    <s-form :model="formState" ref="formRef">
      <s-form-item name="price" label="Price" :rules="[{ validator: checkPrice }]">
        <price-input v-model="formState.price" />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">Submit</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from 'vue'
import PriceInput, { type Currency } from './PriceInput.vue'
import { toast, type FormExpose } from 'sard'

const formRef = ref<FormExpose>()

const formState = reactive({
  price: {
    number: 0,
    currency: 'rmb' as Currency,
  },
})

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      toast('Success')
      console.log('Received values from form: ', toRaw(formState))
    })
    .catch(() => {
      toast('Fail')
    })
}

const checkPrice = (value: { number: number }) => {
  if (value.number > 0) {
    return true
  }
  return 'Price must be greater than zero!'
}
</script>
