<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜Size 用法演示 -->
  <doc-title>单值选择</doc-title>
  <s-slider :model-value="50" thumb-size="24px" track-size="10px" />

  <doc-title>范围选择</doc-title>
  <s-slider range :model-value="[20, 80]" thumb-size="24px" track-size="10px" />
</template>
