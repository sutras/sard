<template>
  <s-list card>
    <s-list-item arrow hover title="提交工艺参数变更申请" @click="visible = true" />
  </s-list>

  <s-dialog
    v-model:visible="visible"
    title="工艺参数变更申请"
    :overlay-closable="false"
    cancel-text="取消"
    confirm-text="提交审批"
    :before-close="beforeClose"
    popup-style="top: 50%"
  >
    <div class="overflow-y-auto" style="height: 60vh; margin-top: 1px; margin-bottom: 8px">
      <s-form ref="formRef" :model="formModel">
        <s-form-item
          name="device"
          label="设备编号"
          :rules="[{ required: true, message: '请选择设备' }]"
        >
          <s-picker-input
            v-model="formModel.device"
            placeholder="选择设备"
            title="选择设备"
            :columns="[
              { label: 'EQ-2023-204 注塑机-A2', value: 'EQ-2023-204' },
              { label: 'EQ-2024-017 CNC-Lathe-01', value: 'EQ-2024-017' },
              { label: 'EQ-2022-087 热处理炉-H02', value: 'EQ-2022-087' },
            ]"
          />
        </s-form-item>
        <s-form-item name="effectiveAt" label="生效时间">
          <s-datetime-picker-input
            v-model="formModel.effectiveAt"
            type="yMd"
            placeholder="选择生效日期"
          />
        </s-form-item>
        <s-form-item name="shift" label="生效班次">
          <s-picker-input
            v-model="formModel.shift"
            placeholder="选择班次"
            title="选择班次"
            :columns="[
              { label: '早班 08:00-16:00', value: '早班' },
              { label: '中班 16:00-24:00', value: '中班' },
              { label: '晚班 00:00-08:00', value: '晚班' },
            ]"
          />
        </s-form-item>
        <s-form-item name="lockInterlock" label="变更期间锁定联锁">
          <s-switch v-model="formModel.lockInterlock" />
        </s-form-item>
        <s-form-item name="scopes" label="变更项">
          <s-checkbox-input
            v-model="formModel.scopes"
            placeholder="选择变更项"
            :options="[
              { label: '设定温度（°C）', value: 'temp' },
              { label: '保压压力（MPa）', value: 'pressure' },
              { label: '螺杆转速（rpm）', value: 'rpm' },
              { label: '冷却时间（s）', value: 'cooling' },
            ]"
          />
        </s-form-item>
        <s-form-item name="risk" label="风险等级">
          <s-radio-input
            v-model="formModel.risk"
            placeholder="选择风险等级"
            :options="[
              { label: 'L1 可回退', value: 'L1' },
              { label: 'L2 需审批', value: 'L2' },
            ]"
          />
        </s-form-item>
        <s-form-item name="reason" label="变更原因" label-valign="start">
          <s-input
            inlaid
            v-model="formModel.reason"
            type="textarea"
            placeholder="例：模温偏低导致缩痕，需 92 °C → 96 °C"
            show-count
            :maxlength="200"
          />
        </s-form-item>
      </s-form>
    </div>
  </s-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { toast } from 'sard'

const visible = ref(false)

const formRef = ref()

const formModel = reactive({
  device: '',
  effectiveAt: undefined,
  shift: '',
  lockInterlock: true,
  scopes: [],
  risk: '',
  reason: '',
})

const beforeClose = (type: string) => {
  if (type === 'confirm') {
    return formRef.value?.validate().then(() => {
      toast('变更申请已提交，等待工艺工程师审批（预计 30 min）')
      formRef.value?.reset()
    })
  }
}
</script>
