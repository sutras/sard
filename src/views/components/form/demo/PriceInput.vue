<template>
  <!-- 工业语境：备件单价录入（金额 + 币种），供采购报价与备件申领复用 -->
  <s-flex align="center" gap="medium">
    <s-input
      variant="text"
      :model-value="modelValue.number"
      @update:modelValue="onNumberChange"
      :validate-event="false"
    />
    <s-picker-input
      :model-value="modelValue.currency"
      placeholder="币种"
      :columns="[
        { value: 'rmb', label: '人民币' },
        { value: 'dollar', label: '美元' },
      ]"
      @update:modelValue="onCurrencyChange"
      :validate-event="false"
    />
  </s-flex>
</template>

<script setup lang="ts">
import { useFormItemContext, type FormItemContext } from 'sard'

export type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number: number
  currency: Currency
}

const props = defineProps<{
  modelValue: PriceValue
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PriceValue): void
}>()

const formItemContext = useFormItemContext() as FormItemContext

const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
  emit('update:modelValue', { ...props.modelValue, ...changedValue })
  formItemContext.onChange()
}

const onNumberChange = (value: string | number) => {
  const newNumber = parseInt(String(value) || '0', 10)
  triggerChange({ number: newNumber })
}

const onCurrencyChange = (newCurrency: Currency) => {
  triggerChange({ currency: newCurrency })
}
</script>
