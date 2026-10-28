<template>
  <!-- 演示可折叠参数卡：默认收起，展开后显示完整工艺参数，避免大屏首屏信息过载 -->
  <s-card
    title="热处理炉-H02 · 工艺参数"
    collapsible
    aria-label="热处理炉 H02 工艺参数卡（可折叠）"
    data-device-code="EQ-2022-087"
  >
    <s-descriptions label-width="6em">
      <s-descriptions-item label="设定温度">860 °C（量程 0 ~ 950 °C）</s-descriptions-item>
      <s-descriptions-item label="保温时间">180 min（公差 ±5 min）</s-descriptions-item>
      <s-descriptions-item label="碳势">0.85 %C（量程 0.60 ~ 1.10 %C）</s-descriptions-item>
      <s-descriptions-item label="炉压">12 Pa（量程 0 ~ 50 Pa）</s-descriptions-item>
      <s-descriptions-item label="联锁状态">
        <s-tag color="warning" variant="outlined" size="small">待复位</s-tag>
      </s-descriptions-item>
      <s-descriptions-item label="下次保养">2024-11-03（剩余 168 h）</s-descriptions-item>
    </s-descriptions>
  </s-card>
</template>
