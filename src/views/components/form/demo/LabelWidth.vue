<template>
  <!-- 工业语境：长标签（「变更期间锁定联锁」）决定 label-width，短标签保持对齐不跳动 -->
  <doc-page gray title="Label 宽度">
    <s-form :model="formState" ref="formRef" label-width="100px">
      <s-form-item label="工单名称">
        <s-input v-model="formState.name" />
      </s-form-item>
      <s-form-item label="变更期间锁定联锁">
        <s-switch v-model="formState.delivery" />
      </s-form-item>
      <s-form-item label="工单类型">
        <s-checkbox-group v-model="formState.type">
          <s-checkbox value="1">计划检修</s-checkbox>
          <s-checkbox value="2">故障抢修</s-checkbox>
          <s-checkbox value="3">预防维护</s-checkbox>
        </s-checkbox-group>
      </s-form-item>
      <s-form-item label="责任班组">
        <s-radio-group v-model="formState.resource">
          <s-radio value="1">机加班</s-radio>
          <s-radio value="2">注塑班</s-radio>
        </s-radio-group>
      </s-form-item>
      <s-form-item label="变更说明">
        <s-input type="textarea" v-model="formState.desc" />
      </s-form-item>
      <s-form-item>
        <s-button @click="onSubmit">创建工单</s-button>
        <s-button variant="outlined" style="margin-top: 10px">取消</s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>
<script setup lang="ts">
import { reactive, toRaw, ref, type UnwrapRef } from 'vue'
import { type FormExpose } from 'sard'

const formRef = ref<FormExpose>()

interface FormState {
  name: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const onSubmit = () => {
  formRef.value?.validate().then(() => {
    console.log('submit!', toRaw(formState))
  })
}
</script>
