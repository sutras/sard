<template>
  <!-- 场景二：工艺参数录入与防错 —— 量程校验、联锁前置、审批弹窗三段式阻断 -->
  <div class="scene">
    <s-alert type="warning" show-icon role="status" data-alarm-level="warning">
      EQ-2023-204 当前处于「联锁未验证」状态，参数变更须先完成光栅自检。
    </s-alert>

    <s-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="7em"
      aria-label="工艺参数录入表单"
    >
      <s-form-item label="设定温度" name="temperature">
        <s-input v-model="form.temperature" inlaid clearable placeholder="量程 0–120 °C" />
      </s-form-item>
      <s-form-item label="保压压力" name="pressure">
        <s-input v-model="form.pressure" inlaid clearable placeholder="量程 0–45 MPa" />
      </s-form-item>
      <s-form-item label="主轴转速" name="speed">
        <s-input v-model="form.speed" inlaid clearable placeholder="量程 0–3000 rpm" />
      </s-form-item>
      <s-form-item label="尺寸公差" name="tolerance">
        <s-input v-model="form.tolerance" inlaid clearable placeholder="量程 0–0.50 mm" />
      </s-form-item>
      <s-form-item label="联锁前置" name="prechecks">
        <s-checkbox-input
          v-model="form.prechecks"
          placeholder="勾选已完成的安全前置"
          :options="[
            { label: '光栅自检通过', value: 'light-curtain' },
            { label: '急停回路实测', value: 'estop-loop' },
            { label: '班组长现场确认', value: 'leader-confirm' },
          ]"
        />
      </s-form-item>
      <s-form-item>
        <s-button block aria-label="提交参数变更，需工艺工程师审批" @click="onSubmit">
          提交工艺工程师审批
        </s-button>
      </s-form-item>
    </s-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { dialog, toast, type FieldValidateError, type FormExpose, type FormRules } from 'sard'

const formRef = ref<FormExpose>()

const form = reactive({
  temperature: '',
  pressure: '',
  speed: '',
  tolerance: '',
  prechecks: [] as string[],
})

const range =
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
  temperature: [{ validator: range('设定温度', 0, 120, '°C'), trigger: 'blur' }],
  pressure: [{ validator: range('保压压力', 0, 45, 'MPa'), trigger: 'blur' }],
  speed: [{ validator: range('主轴转速', 0, 3000, 'rpm'), trigger: 'blur' }],
  tolerance: [{ validator: range('尺寸公差', 0, 0.5, 'mm'), trigger: 'blur' }],
  prechecks: [
    {
      type: 'array',
      required: true,
      message: '至少勾选一项安全前置，联锁不予放行',
      trigger: 'change',
    },
  ],
})

const onSubmit = () => {
  formRef.value
    ?.validate()
    .then(() => {
      dialog.confirm({
        title: '提交参数变更 · 风险 L2',
        message: `变更内容：温度 ${form.temperature} °C / 压力 ${form.pressure} MPa / 转速 ${form.speed} rpm / 公差 ${form.tolerance} mm。提交后进入工艺工程师审批队列，审批期间设备维持原参数运行。`,
        cancelText: '返回检查',
        confirmText: '提交审批',
        overlayClosable: false,
      })
    })
    .catch((error: FieldValidateError[]) => {
      toast(error[0]?.message ?? '参数校验未通过，已阻断提交')
    })
}
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
