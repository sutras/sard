<template>
  <!-- 演示联锁阻断：安全联锁未验证时，启动/下发/急停复位三类按钮一律置灰，附禁用原因 -->
  <s-flex vertical gap="small">
    <p class="text-sm">EQ-2023-204 安全联锁未验证，以下操作已阻断：</p>
    <s-flex wrap gap="medium">
      <s-button disabled variant="solid" aria-label="启动设备（已禁用）">启动设备</s-button>
      <s-button disabled variant="outlined" aria-label="下发工单（已禁用）">下发工单</s-button>
      <s-button disabled variant="dashed" aria-label="解除联锁（已禁用）">解除联锁</s-button>
      <s-button disabled variant="filled" aria-label="急停复位（已禁用）">急停复位</s-button>
      <s-button disabled variant="text" aria-label="查看实时参数（已禁用）">实时参数</s-button>
      <s-button disabled variant="link" aria-label="查看点检记录（已禁用）">点检记录</s-button>
    </s-flex>
    <p class="text-sm">解除条件：光栅自检通过 + 班组长在 MES 侧复位联锁。</p>
  </s-flex>
</template>
