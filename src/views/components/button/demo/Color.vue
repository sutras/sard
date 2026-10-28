<template>
  <!-- 演示安全色自定义：红=急停/危险，黄=警告，绿=运行，蓝=通讯，渐变=能耗趋势，颜色承担现场语义 -->
  <s-flex wrap gap="medium">
    <s-button variant="solid" style="background: #d92b2b" aria-label="触发急停">急停</s-button>
    <s-button
      variant="outlined"
      style="color: #d92b2b; border-color: #d92b2b"
      aria-label="挂检修牌"
    >
      挂检修牌
    </s-button>
    <s-button variant="dashed" style="color: #b7791f; border-color: #b7791f" aria-label="降载运行">
      降载运行
    </s-button>
    <s-button
      variant="filled"
      style="color: #2f855a; background: rgb(47 133 90 / 8%)"
      aria-label="启动设备"
    >
      启动设备
    </s-button>
    <s-button variant="text" style="color: #2b6cb0" aria-label="查看参数趋势">参数趋势</s-button>
    <s-button variant="link" style="color: #2b6cb0" aria-label="查看报警历史">报警历史</s-button>
    <s-button style="background: linear-gradient(to right, #38a169, #2b6cb0)" aria-label="能耗对比">
      单位能耗 0.42 kWh/件
    </s-button>
  </s-flex>
</template>
