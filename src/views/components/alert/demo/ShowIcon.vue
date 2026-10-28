<template>
  <!-- 演示带图标告警：图标区分提示/通过/预警/报警四类，巡检人员在强光车间可先按图标识别 -->
  <s-alert show-icon type="primary" role="status" data-alarm-level="info">
    提示：本班次点检任务剩余 3 项未完成（ST-04 / ST-05 / ST-13）。
  </s-alert>
  <s-alert show-icon type="success" role="status" data-alarm-level="normal">
    联锁验证通过：CNC-Lathe-01 光栅自检与急停回路实测均合格。
  </s-alert>
  <s-alert show-icon type="warning" role="status" data-alarm-level="warning">
    参数越限预警：热处理炉-H02 碳势 1.12 %C，超出量程上限 1.10 %C。
  </s-alert>
  <s-alert show-icon type="danger" role="alert" data-alarm-level="critical">
    设备报警：空压机-C01 排气温度 88.9 °C，超出量程上限 85 °C，需立即处置。
  </s-alert>
</template>
