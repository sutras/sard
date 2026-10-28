<template>
  <!-- 工业语境：按告警等级着色：红=报警、蓝=待办、灰=已确认 -->
  <s-badge :value="5" color="var(--s-color-primary)">
    <doc-badge-box />
  </s-badge>

  <s-badge dot color="var(--s-color-primary)">
    <doc-badge-box />
  </s-badge>

  <s-badge :value="5" color="var(--s-gray-200)" text-color="var(--s-gray-800)">
    <doc-badge-box />
  </s-badge>
</template>
