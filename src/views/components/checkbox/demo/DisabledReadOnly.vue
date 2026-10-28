<template>
  <!-- 工业语境：点检项与安全前置勾选｜DisabledReadOnly 用法演示 -->
  <doc-title>只读</doc-title>
  <s-checkbox readonly>点检项：振动值（已锁定）</s-checkbox>
  <s-checkbox readonly checked style="margin-top: 5px">班前点检已完成（已锁定）</s-checkbox>

  <doc-title>禁用</doc-title>
  <s-checkbox disabled>联锁旁路（仅维护模式）</s-checkbox>
  <s-checkbox disabled checked style="margin-top: 5px">已触发急停（不可撤销）</s-checkbox>
</template>
