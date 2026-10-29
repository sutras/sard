<template>
  <div class="scene">
    <p class="scene__hint">
      从图标库拖拽实体到画布，自动带出 deviceType / unitCode /
      量程，生成可直接下发给采集网关的语义描述。
    </p>

    <EntityModeling />

    <s-descriptions label-width="7em" bordered>
      <s-descriptions-item label="deviceType">设备类型枚举，与采集侧模型库对齐</s-descriptions-item>
      <s-descriptions-item label="unitCode">位号，现场铭牌唯一，禁止重复</s-descriptions-item>
      <s-descriptions-item label="minValue / maxValue">
        量程上下限，越限即触发工艺参数越限告警
      </s-descriptions-item>
      <s-descriptions-item label="unit">工程单位（°C、MPa、rpm、mm/s）</s-descriptions-item>
      <s-descriptions-item label="status">
        状态机取值：RUN / IDLE / ALARM / STOP / MAINT
      </s-descriptions-item>
    </s-descriptions>
  </div>
</template>

<script setup lang="ts">
import EntityModeling from './EntityModeling.vue'
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scene__hint {
  margin: 0;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
}
</style>
