<template>
  <!-- 工业语境：工单下发、授权与联锁校验的回执轻提示｜Basic 用法演示 -->
  <s-list card>
    <s-list-item hover arrow title="普通文本：下发回执" @click="onToast" />
    <s-list-item hover arrow title="长文本：报警处置说明" @click="onLongToast" />
    <s-list-item hover arrow title="成功：授权通过" @click="onSuccessToast" />
    <s-list-item hover arrow title="失败：联锁未通过" @click="onFailToast" />
    <s-list-item hover arrow title="加载中：等待 MES 回执" @click="onLoadingToast" />
    <s-list-item hover arrow title="手动隐藏" @click="onHideToast" />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onToast = () => {
  toast('工单 WO-20241027-0083 已下发至注塑二线 / ST-11')
}

const onLongToast = () => {
  toast(
    '注塑机-A2 于 09:41 触发 E-1042 安全门联锁断开，设备已进入 STOP 并泄压；在制件全部转返修判定，等待设备主管复位与联锁复检。',
  )
}

const onSuccessToast = () => {
  toast.success('授权通过，有效期至本班次结束 16:00')
}

const onFailToast = () => {
  toast.fail('联锁自检未通过，启动指令已阻断')
}

const onLoadingToast = () => {
  toast.loading('等待 MES 回执…')
}

const onHideToast = () => {
  toast.hide()
}
</script>
