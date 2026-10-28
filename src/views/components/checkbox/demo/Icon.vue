<template>
  <!-- 工业语境：点检项与安全前置勾选｜Icon 用法演示 -->
  <s-checkbox checked>
    <template #icon="{ checked }">
      <demo-icon :name="checked ? 'quality' : 'close'" />
    </template>
    点检项：导轨油位
  </s-checkbox>
</template>
