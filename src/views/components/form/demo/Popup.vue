<template>
  <doc-page gray title="弹出框中的表单">
    <div class="mx-4">
      <s-button block @click="showForm = true">显示表单</s-button>
    </div>
    <s-popout
      v-model:visible="showForm"
      title="表单弹出框"
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
          <s-form-item label="Activity name" name="name">
            <s-input v-model="ruleForm.name" clearable inlaid placeholder="Activity name" />
          </s-form-item>
          <s-form-item label="Activity zone" name="region">
            <s-picker-input
              v-model="ruleForm.region"
              clearable
              placeholder="Activity zone"
              :columns="[
                { label: 'Zone one', value: 'shanghai' },
                { label: 'Zone two', value: 'beijing' },
              ]"
            />
          </s-form-item>
          <s-form-item label="Activity count" name="count">
            <s-picker-input
              v-model="ruleForm.count"
              clearable
              placeholder="Activity count"
              :columns="options"
            />
          </s-form-item>
          <s-form-item label="Activity time" required name="date1">
            <s-datetime-picker-input
              v-model="ruleForm.date1"
              clearable
              type="yMd"
              placeholder="Pick a date"
            />
          </s-form-item>
          <s-form-item label="" hide-star name="date2">
            <s-datetime-picker-input
              v-model="ruleForm.date2"
              clearable
              type="hms"
              placeholder="Pick a time"
            />
          </s-form-item>
          <s-form-item label="Instant delivery" name="delivery">
            <s-switch v-model="ruleForm.delivery" />
          </s-form-item>
          <s-form-item label="Activity type" name="type">
            <s-checkbox-input
              v-model="ruleForm.type"
              clearable
              placeholder="Pick Activity type"
              :options="[
                { label: 'Online activities', value: 'Online activities' },
                {
                  label: 'Promotion activities',
                  value: 'Promotion activities',
                },
                { label: 'Offline activities', value: 'Offline activities' },
                {
                  label: 'Simple brand exposure',
                  value: 'Simple brand exposure',
                },
              ]"
            />
          </s-form-item>
          <s-form-item label="Resources" name="resource">
            <s-radio-input
              v-model="ruleForm.resource"
              clearable
              placeholder="Pick Resources"
              :options="[
                { label: 'Sponsor', value: 'Sponsor' },
                { label: 'Venue', value: 'Venue' },
              ]"
            />
          </s-form-item>
          <s-form-item label="Activity form" name="desc">
            <s-input
              v-model="ruleForm.desc"
              clearable
              type="textarea"
              inlaid
              placeholder="Activity form"
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
  name: 'Hello',
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
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) {
    return
  }

  formEl
    .validate()
    .then(() => {
      toast('Success!')
      console.log('Success!')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('error submit!', error)
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
