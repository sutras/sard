<template>
  <!-- 工业语境：启停与联锁开关｜DisabledReadOnly 用法演示 -->
  <doc-title>只读</doc-title>
  <s-switch readonly />
  <s-switch :model-value="true" readonly class="ms-2" />

  <doc-title>禁用</doc-title>
  <s-switch disabled />
  <s-switch :model-value="true" disabled class="ms-2" />
</template>
