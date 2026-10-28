<template>
  <!-- 工业语境：参数连续调节（转速 / 温度）｜ShowScale 用法演示 -->
  <doc-title>单滑块</doc-title>
  <s-slider :model-value="40" show-scale :step="20" />

  <doc-title>双滑块</doc-title>
  <s-slider range :model-value="[20, 80]" show-scale :step="20" />

  <doc-title>刻度显示在上面</doc-title>
  <s-slider :model-value="40" show-scale scale-position="top" :step="20" />

  <doc-title>垂直刻度</doc-title>
  <div style="display: flex; flex-direction: row">
    <div>
      <doc-title>单滑块</doc-title>
      <s-slider :model-value="25" vertical show-scale :step="25" />
    </div>

    <div style="margin-inline-start: 50px">
      <doc-title>双滑块</doc-title>
      <s-slider range :model-value="[25, 75]" vertical show-scale :step="25" />
    </div>

    <div style="margin-inline-start: 50px">
      <doc-title>刻度显示在右边</doc-title>
      <s-slider :model-value="25" vertical show-scale scale-position="right" :step="25" />
    </div>
  </div>
</template>
