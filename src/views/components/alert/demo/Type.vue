<template>
  <!-- 演示四级告警语义：primary=点检提醒，success=联锁验证通过，warning=参数越限预警，danger=设备报警需停机 -->
  <s-alert type="primary" role="status" data-alarm-level="info">
    提示：注塑二线 10:00 计划换模，请提前完成模温机点检。
  </s-alert>
  <s-alert type="success" role="status" data-alarm-level="normal">
    联锁验证通过：压铸机-D03 安全门双通道自检完成（记录 LK-20241027-05）。
  </s-alert>
  <s-alert type="warning" role="status" data-alarm-level="warning">
    参数越限预警：AGV-03 电量 21 %，低于派工阈值 25 %，已自动返回充电桩。
  </s-alert>
  <s-alert type="danger" role="alert" data-alarm-level="critical">
    设备报警：注塑机-A2 安全门联锁断开（E-1042），液压单元已紧急泄压，需立即处置。
  </s-alert>
</template>
