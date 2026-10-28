<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜Color 用法演示 -->
  <doc-title>单值选择</doc-title>
  <s-slider :model-value="50" color="var(--s-color-warning)" thumb-color="var(--s-color-warning)" />

  <doc-title>范围选择</doc-title>
  <s-slider
    range
    :model-value="[20, 80]"
    color="var(--s-color-warning)"
    thumb-color="var(--s-color-warning)"
  />
</template>
