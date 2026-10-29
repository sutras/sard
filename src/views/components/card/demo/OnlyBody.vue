<template>
  <s-card data-metric="oee" data-unit="%">
    <div class="flex items-end gap-1">
      <span class="text-3xl font-bold leading-none">87.3</span>
      <span class="text-sm">%</span>
    </div>
    <p class="mt-2 mb-3 text-sm">设备综合效率 OEE · 目标 85 % · 环比 +1.9 %</p>
    <s-progress-bar :percent="87.3" status="success" />
  </s-card>

  <s-card class="mt-3" data-metric="spindle-temp" data-unit="°C">
    <div class="flex items-end gap-1">
      <span class="text-3xl font-bold leading-none">62.4</span>
      <span class="text-sm">°C</span>
    </div>
    <p class="mt-2 mb-3 text-sm">主轴温度 · 预警阈值 65 °C · 量程 -20 ~ 120 °C</p>
    <s-progress-bar :percent="68" color="var(--s-color-warning)" />
  </s-card>
</template>
