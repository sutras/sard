<template>
  <!-- 工业语境：网关离线空态 —— 空态直接给出恢复动作，不允许只显示「暂无数据」 -->
  <s-empty description="数据采集网关离线，最后上报 09:12:48" aria-label="采集网关离线空态">
    <s-button variant="link" aria-label="重试采集">重试采集</s-button>
  </s-empty>
</template>
