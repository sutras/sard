<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜DisabledReadOnly 用法演示 -->
  <doc-title>只读</doc-title>
  <s-slider :model-value="50" readonly />

  <doc-title>禁用</doc-title>
  <s-slider :model-value="50" disabled />
</template>
