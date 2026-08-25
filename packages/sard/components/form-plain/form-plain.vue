<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { type FormPlainProps, type FormPlainSlots, type FormPlainExpose } from './common'
import { useForm } from '../form/useForm'
import { defaultFormProps } from '../form/common'

const props = withDefaults(defineProps<FormPlainProps>(), defaultFormProps)

defineSlots<FormPlainSlots>()

const { expose } = useForm(props)

defineExpose<FormPlainExpose>(expose)
</script>
