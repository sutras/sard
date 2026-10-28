<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜ShowValue 用法演示 -->
  <doc-title>单滑块</doc-title>
  <s-slider :model-value="50" show-value />

  <doc-title>双滑块</doc-title>
  <s-slider :model-value="[20, 80]" range show-value />
</template>
