<template>
  <s-flex vertical gap="small">
    <p class="text-sm">EQ-2023-204 安全联锁未验证，以下操作已阻断：</p>
    <s-flex wrap gap="medium">
      <s-button disabled variant="solid">启动设备</s-button>
      <s-button disabled variant="outlined">下发工单</s-button>
      <s-button disabled variant="dashed">解除联锁</s-button>
      <s-button disabled variant="filled">急停复位</s-button>
      <s-button disabled variant="text">实时参数</s-button>
      <s-button disabled variant="link">点检记录</s-button>
    </s-flex>
    <p class="text-sm">解除条件：光栅自检通过 + 班组长在 MES 侧复位联锁。</p>
  </s-flex>
</template>
