<template>
  <!-- 演示工单下发中的阻塞态：按钮 loading 期间禁止重复下发，避免同一工单被重复派发 -->
  <s-flex wrap align="center" gap="medium">
    <s-button size="xs" loading aria-label="派工下发中">派工中</s-button>
    <s-button size="small" loading aria-label="点检回传中">回传中</s-button>
    <s-button loading aria-label="工单下发中">下发工单中…</s-button>
    <s-button size="large" loading loading-type="clock" aria-label="设备停机中">
      停机执行中…
    </s-button>
  </s-flex>
</template>
