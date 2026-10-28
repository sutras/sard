<template>
  <!-- 演示机台状态卡：标题为设备位号，右上角状态徽标取自状态机，正文给出带单位与量程的实时参数 -->
  <s-card title="CNC-Lathe-01" aria-label="设备状态卡 CNC-Lathe-01" data-device-code="EQ-2024-017">
    <template #extra>
      <s-tag color="success" variant="filled" size="small" round data-status="RUN">运行中</s-tag>
    </template>
    <s-descriptions label-width="5em">
      <s-descriptions-item label="设备编号">EQ-2024-017</s-descriptions-item>
      <s-descriptions-item label="所在产线">机加工一线 / ST-04</s-descriptions-item>
      <s-descriptions-item label="OEE">87.3 %（目标 85 %）</s-descriptions-item>
      <s-descriptions-item label="主轴温度">62.4 °C（量程 -20 ~ 120 °C）</s-descriptions-item>
      <s-descriptions-item label="振动烈度">1.2 mm/s（预警 4.5 mm/s）</s-descriptions-item>
      <s-descriptions-item label="当前工单">WO-20241027-0081</s-descriptions-item>
    </s-descriptions>
  </s-card>
</template>
