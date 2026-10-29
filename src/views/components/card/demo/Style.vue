<template>
  <s-card
    style="
      --s-card-bg: var(--s-color-danger);
      --s-card-border-color: white;
      --s-card-bg-active: rgba(var(--s-color-danger-rgb), 0.9);
      --s-card-footer-border-style: dashed;
      --s-card-border-width: 2px;
      color: white;
    "
    title="L3 严重告警 · 空压机-C01"
    footer="需立即处置：30 min 内未复位将自动降载"
    hover
    role="alert"
    data-alarm-level="critical"
  >
    <p>排气温度 88.9 °C，超出量程上限 85 °C。</p>
    <p>报警代码 E-2207 · 触发时间 09:38:11</p>
    <p>处置链路：值班人员确认 → 班组长授权 → 降载或停机</p>
  </s-card>

  <s-card class="mt-7" hover data-work-order="WO-20241027-0083">
    <template #icon>
      <s-text class="flex mt-1" color="primary" size="large">
        <PencilSquare />
      </s-text>
    </template>

    <template #title>
      <div class="flex gap-2 font-bold">
        <span>生产工单</span>
        <span>WO-20241027-0083</span>
      </div>
      <s-text tag="p" class="mt-2" color="primary" size="small">待开工 · 需班组长授权</s-text>
    </template>

    <s-descriptions label-width="5em">
      <s-descriptions-item label="产线">注塑二线 / ST-11</s-descriptions-item>
      <s-descriptions-item label="计划开工">2024-10-27 10:00:00</s-descriptions-item>
      <s-descriptions-item label="批次号">L20241027-B01（1200 件）</s-descriptions-item>
      <s-descriptions-item label="责任班组">注塑二班</s-descriptions-item>
      <s-descriptions-item label="工艺参数">模温 92 °C / 保压 45 MPa</s-descriptions-item>
    </s-descriptions>
  </s-card>
</template>

<script setup lang="ts">
import { PencilSquare } from '@sard/icons'
</script>
