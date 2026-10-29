<template>
  <doc-page gray title="弹出框中的表单">
    <div class="mx-4">
      <s-button block @click="showForm = true">新建生产工单</s-button>
    </div>
    <s-popout
      v-model:visible="showForm"
      title="新建生产工单"
      :beforeClose="beforeClose"
      @confirm="onConfirm"
    >
      <div class="overflow-y-auto" style="height: 60vh">
        <s-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          scroll-to-first-error
          :scroll-into-view-options="{
            block: 'center',
            behavior: 'smooth',
          }"
        >
          <s-form-item label="工单名称" name="name">
            <s-input v-model="ruleForm.name" clearable inlaid placeholder="例 精车外圆 WO-0083" />
          </s-form-item>
          <s-form-item label="产线" name="region">
            <s-picker-input
              v-model="ruleForm.region"
              clearable
              placeholder="选择产线"
              :columns="[
                { label: '机加工一线', value: 'line-machining-1' },
                { label: '注塑二线', value: 'line-injection-2' },
              ]"
            />
          </s-form-item>
          <s-form-item label="计划数量" name="count">
            <s-picker-input
              v-model="ruleForm.count"
              clearable
              placeholder="选择计划数量（件）"
              :columns="options"
            />
          </s-form-item>
          <s-form-item label="计划开工日" required name="date1">
            <s-datetime-picker-input
              v-model="ruleForm.date1"
              clearable
              type="yMd"
              placeholder="选择开工日期"
            />
          </s-form-item>
          <s-form-item label="" hide-star name="date2">
            <s-datetime-picker-input
              v-model="ruleForm.date2"
              clearable
              type="hms"
              placeholder="选择开工时刻"
            />
          </s-form-item>
          <s-form-item label="开工前预热" name="delivery">
            <s-switch v-model="ruleForm.delivery" />
          </s-form-item>
          <s-form-item label="变更项" name="type">
            <s-checkbox-input
              v-model="ruleForm.type"
              clearable
              placeholder="选择变更项"
              :options="[
                { label: '工艺参数', value: 'process' },
                {
                  label: '工装夹具',
                  value: 'fixture',
                },
                { label: '程序版本', value: 'program' },
                {
                  label: '检验标准',
                  value: 'inspection',
                },
              ]"
            />
          </s-form-item>
          <s-form-item label="责任班组" name="resource">
            <s-radio-input
              v-model="ruleForm.resource"
              clearable
              placeholder="选择责任班组"
              :options="[
                { label: '机加班', value: 'machining' },
                { label: '注塑班', value: 'injection' },
              ]"
            />
          </s-form-item>
          <s-form-item label="备注" name="desc">
            <s-input
              v-model="ruleForm.desc"
              clearable
              type="textarea"
              inlaid
              placeholder="例 模温 92 °C / 保压 45 MPa / 冷却 18 s"
            />
          </s-form-item>
        </s-form>
      </div>
    </s-popout>
  </doc-page>
</template>

<script setup lang="ts">
import { type PopoutBeforeClose } from 'sard'
import { reactive, ref } from 'vue'
import { toast, type FormRules, type FormExpose, type FieldValidateError } from 'sard'

const showForm = ref(false)

interface RuleForm {
  name: string
  region: string
  count: string
  date1: Date | undefined
  date2: Date | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

const ruleFormRef = ref<FormExpose>()
const ruleForm = reactive<RuleForm>({
  name: 'CNC-Lathe-01',
  region: '',
  count: '',
  date1: undefined,
  date2: undefined,
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入工单名称', trigger: 'blur' },
    { min: 3, max: 20, message: '工单名称长度需在 3 到 20 字之间', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: '请选择产线',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: '请选择计划数量',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择计划开工日',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择开工时刻',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '至少选择一个变更项',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: '请选择责任班组',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: '请填写备注，说明本次变更内容', trigger: 'blur' }],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) {
    return
  }

  formEl
    .validate()
    .then(() => {
      toast('工单已提交，等待班组长授权')
      console.log('工单已提交')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('校验未通过', error)
    })
}

const options = Array.from({ length: 100 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const beforeClose: PopoutBeforeClose = (type) => {
  if (type === 'confirm') {
    return false
  }
}

const onConfirm = () => {
  submitForm(ruleFormRef.value)
  // showForm.value = false
}
</script>
