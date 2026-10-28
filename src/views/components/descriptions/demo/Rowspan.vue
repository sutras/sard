<template>
  <!-- 工业语境：设备台账字段展示（编号 / 位号 / 量程 / 联锁）｜Rowspan 用法演示 -->
  <s-descriptions :columns="2" bordered label-width="5em">
    <s-descriptions-item label="头像" :rowspan="2">
      <s-avatar />
    </s-descriptions-item>
    <s-descriptions-item label="操作员">王海（A-1042）</s-descriptions-item>
    <s-descriptions-item label="设备编号">EQ-2024-017</s-descriptions-item>
    <s-descriptions-item label="安装位置">机加工一线 / ST-04</s-descriptions-item>
  </s-descriptions>
</template>
