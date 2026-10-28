<template>
  <!-- 工业语境：为零时是否显示：报警清零后应隐藏角标 -->
  <s-badge :value="0">
    <doc-badge-box />
  </s-badge>

  <s-badge :value="0" showZero>
    <doc-badge-box />
  </s-badge>
</template>
