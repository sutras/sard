<template>
  <!-- 工业语境：设备台账字段展示（编号 / 位号 / 量程 / 联锁）｜Slot 用法演示 -->
  <s-descriptions bordered label-width="6em">
    <s-descriptions-item>
      <template #label>
        <div class="flex items-center gap-2">
          <demo-icon name="user" />
          <span>姓名</span>
        </div>
      </template>
      王海（A-1042）
    </s-descriptions-item>
    <s-descriptions-item label="设备编号">
      <template #label>
        <div class="flex items-center gap-1">
          <demo-icon name="phone" />
          <span>姓名</span>
        </div>
      </template>
      <s-button variant="link" compact>EQ-2024-017</s-button>
    </s-descriptions-item>
  </s-descriptions>
</template>
