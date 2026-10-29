<template>
  <div class="scene">
    <s-alert type="danger" show-icon role="alert" data-alarm-level="critical">
      E-1042 注塑机-A2 安全门联锁断开，液压单元已紧急泄压 —— 需立即处置
    </s-alert>
    <s-alert type="warning" show-icon role="status" data-alarm-level="warning">
      W-2081 CNC-Lathe-01 主轴温度 62.4 °C，接近预警阈值 65 °C
    </s-alert>
    <s-alert type="primary" show-icon role="status" data-alarm-level="info">
      I-0301 AGV-03 电量 21 %，已自动返回充电桩
    </s-alert>

    <s-list card>
      <s-list-item title="确认告警（写入处置记录）" arrow hover @click="onAck" />
      <s-list-item title="转派维修班" arrow hover @click="onTransfer" />
      <s-list-item title="停机处置（需班组长授权）" arrow hover @click="visible = true" />
    </s-list>

    <s-dialog
      v-model:visible="visible"
      title="停机处置 · 需班组长授权"
      :overlay-closable="false"
      :close-on-back-press="false"
      cancel-text="取消（设备保持运行）"
      confirm-text="授权并停机"
      :before-close="beforeClose"
      @confirm="onConfirmed"
    >
      <div class="scene__dialog">
        <p>对象：EQ-2023-204 注塑机-A2（注塑二线 / ST-11）</p>
        <p>停机将终止在制批次 L20241027-B01（1200 件），恢复需设备主管复位并联锁复检。</p>
        <s-form :model="authorization">
          <s-form-item
            label="授权码"
            :rules="[{ required: true, message: '需班组长授权码' }]"
            name="code"
          >
            <s-input v-model="authorization.code" inlaid clearable placeholder="扫描班组长授权码" />
          </s-form-item>
        </s-form>
      </div>
    </s-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { toast } from 'sard'

const visible = ref(false)
const authorization = reactive({ code: '' })

const onAck = () => {
  toast('已确认 E-1042，处置记录 ALM-20241027-0031 已归档')
}

const onTransfer = () => {
  toast('已转派维修班，预计到场 8 min')
}

const beforeClose = (type: 'close' | 'cancel' | 'confirm') => {
  if (type !== 'confirm') {
    return
  }
  if (authorization.code.trim().length < 6) {
    toast('缺少班组长授权码，停机指令已阻断')
    return false
  }
}

const onConfirmed = () => {
  toast('停机指令已下发，等待现场泄压确认')
}

// 关闭后再清空授权码：@confirm 早于 beforeClose 触发，提前清空会让校验永远失败
watch(visible, (value) => {
  if (!value) {
    authorization.code = ''
  }
})
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.scene__dialog {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: var(--s-font-size-sm);
}
</style>
