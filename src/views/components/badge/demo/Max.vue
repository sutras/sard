<template>
  <!-- 工业语境：角标上限：超过 99 条显示 99+，避免大屏占位 -->
  <s-badge :value="100">
    <doc-badge-box />
  </s-badge>

  <s-badge :value="100" :max="200">
    <doc-badge-box />
  </s-badge>
</template>
