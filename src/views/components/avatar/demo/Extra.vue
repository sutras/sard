<template>
  <!-- 工业语境：当班人员与责任班组头像，编号与工号一一对应｜Extra 用法演示 -->
  <s-avatar shape="square">
    <template #extra>
      <s-badge fixed :value="5" />
    </template>
  </s-avatar>

  <s-avatar style="margin-top: 10px">
    <template #extra>
      <s-badge fixed :value="5" style="top: 14.6447%; right: 14.6447%" />
    </template>
  </s-avatar>
</template>
