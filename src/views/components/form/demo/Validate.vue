<template>
  <!-- 演示工艺参数录入与防错：温度/压力按设备量程校验，越限即阻断提交并提示量程区间 -->
  <doc-page gray title="表单校验">
    <s-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="8em">
      <s-form-item label="设备编号" name="device">
        <s-picker-input
          v-model="ruleForm.device"
          clearable
          placeholder="选择设备"
          :columns="[
            { label: 'EQ-2023-204 注塑机-A2', value: 'EQ-2023-204' },
            { label: 'EQ-2024-017 CNC-Lathe-01', value: 'EQ-2024-017' },
          ]"
        />
      </s-form-item>
      <s-form-item label="生效班次" name="shift">
        <s-picker-input
          v-model="ruleForm.shift"
          clearable
          placeholder="选择班次"
          :columns="[
            { label: '早班 08:00-16:00', value: '早班' },
            { label: '中班 16:00-24:00', value: '中班' },
            { label: '晚班 00:00-08:00', value: '晚班' },
          ]"
        />
      </s-form-item>
      <s-form-item label="设定温度" name="temperature">
        <s-input v-model="ruleForm.temperature" clearable inlaid placeholder="量程 0–120" />
      </s-form-item>
      <s-form-item label="保压压力" name="pressure">
        <s-input v-model="ruleForm.pressure" clearable inlaid placeholder="量程 0–45 MPa" />
      </s-form-item>
      <s-form-item label="生效日期" required name="effectiveDate">
        <s-datetime-picker-input
          v-model="ruleForm.effectiveDate"
          clearable
          type="yMd"
          placeholder="选择生效日期"
        />
      </s-form-item>
      <s-form-item label="" hide-star name="effectiveTime">
        <s-datetime-picker-input
          v-model="ruleForm.effectiveTime"
          clearable
          type="hms"
          placeholder="选择生效时刻"
        />
      </s-form-item>
      <s-form-item label="变更期间锁联锁" name="lockInterlock">
        <s-switch v-model="ruleForm.lockInterlock" />
      </s-form-item>
      <s-form-item label="联锁前置项" name="prechecks">
        <s-checkbox-input
          v-model="ruleForm.prechecks"
          clearable
          placeholder="选择已完成的安全前置"
          :options="[
            { label: '光栅自检通过', value: 'light-curtain' },
            { label: '急停回路实测', value: 'estop-loop' },
            { label: '安全门双通道', value: 'door-switch' },
            { label: '班组长现场确认', value: 'leader-confirm' },
          ]"
        />
      </s-form-item>
      <s-form-item label="风险等级" name="risk">
        <s-radio-input
          v-model="ruleForm.risk"
          clearable
          placeholder="选择风险等级"
          :options="[
            { label: 'L1 可回退', value: 'L1' },
            { label: 'L2 需审批', value: 'L2' },
          ]"
        />
      </s-form-item>
      <s-form-item label="变更原因" name="reason">
        <s-input
          v-model="ruleForm.reason"
          clearable
          type="textarea"
          inlaid
          placeholder="例：模温偏低导致缩痕，需 92 °C → 96 °C"
        />
      </s-form-item>
      <s-form-item>
        <s-button @click="submitForm(ruleFormRef)" aria-label="提交参数变更申请">提交审批</s-button>
        <s-button
          variant="outlined"
          @click="resetForm(ruleFormRef)"
          style="margin-top: 10px"
          aria-label="重置表单"
        >
          重置
        </s-button>
      </s-form-item>
    </s-form>
  </doc-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast, type FormRules, type FormExpose, type FieldValidateError } from 'sard'

interface RuleForm {
  device: string
  shift: string
  temperature: string
  pressure: string
  effectiveDate: Date | undefined
  effectiveTime: Date | undefined
  lockInterlock: boolean
  prechecks: string[]
  risk: string
  reason: string
}

const ruleFormRef = ref<FormExpose>()
const ruleForm = reactive<RuleForm>({
  device: 'EQ-2023-204',
  shift: '',
  temperature: '',
  pressure: '',
  effectiveDate: undefined,
  effectiveTime: undefined,
  lockInterlock: true,
  prechecks: [],
  risk: '',
  reason: '',
})

const numberInRange =
  (label: string, min: number, max: number, unit: string) => (context: { value: any }) => {
    const raw = context.value
    if (raw === '' || raw === undefined || raw === null) {
      return `${label}为安全相关字段，必须填写`
    }
    const num = Number(raw)
    if (Number.isNaN(num)) {
      return `${label}必须为数值，单位 ${unit}`
    }
    if (num < min || num > max) {
      return `超出设备允许量程 ${min}–${max} ${unit}，指令已阻断`
    }

    return true
  }

const rules = reactive<FormRules>({
  device: [{ required: true, message: '请选择受控设备', trigger: 'change' }],
  shift: [{ required: true, message: '请选择生效班次', trigger: 'change' }],
  temperature: [
    { validator: numberInRange('设定温度', 0, 120, '°C'), trigger: 'blur' },
    { required: true, message: '设定温度为安全相关字段，必须填写', trigger: 'change' },
  ],
  pressure: [{ validator: numberInRange('保压压力', 0, 45, 'MPa'), trigger: 'blur' }],
  effectiveDate: [{ type: 'date', required: true, message: '请选择生效日期', trigger: 'change' }],
  effectiveTime: [{ type: 'date', required: true, message: '请选择生效时刻', trigger: 'change' }],
  prechecks: [
    {
      type: 'array',
      required: true,
      message: '至少勾选一项已完成的安全前置，否则联锁不予放行',
      trigger: 'change',
    },
  ],
  risk: [{ required: true, message: '请选择风险等级', trigger: 'change' }],
  reason: [{ required: true, message: '变更原因将进入审批记录，必须填写', trigger: 'blur' }],
})

const submitForm = (formEl?: FormExpose) => {
  if (!formEl) {
    return
  }

  formEl
    .validate()
    .then(() => {
      toast('参数变更已提交，等待工艺工程师审批')
    })
    .catch((error: FieldValidateError[]) => {
      console.log('参数校验未通过', error)
    })
}

const resetForm = (formEl?: FormExpose) => {
  if (!formEl) return
  formEl.reset()
}
</script>
