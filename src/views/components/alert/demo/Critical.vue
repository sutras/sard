<template>
  <div class="critical-alarm">
    <s-alert type="danger" show-icon role="alert" data-alarm-level="critical" data-pulse="true">
      严重告警 · EQ-2021-009 空压机-C01 排气温度 88.9 °C，超量程上限 85 °C —— 需立即处置
    </s-alert>
  </div>
</template>

<style lang="scss" scoped>
.critical-alarm {
  :deep(.s-alert) {
    animation: critical-pulse 1.6s ease-in-out infinite;
  }
}

@keyframes critical-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgb(217 43 43 / 45%);
  }

  50% {
    box-shadow: 0 0 0 6px rgb(217 43 43 / 0%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .critical-alarm :deep(.s-alert) {
    animation: none;
  }
}
</style>
