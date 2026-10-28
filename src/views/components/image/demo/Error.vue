<template>
  <!-- 工业语境：设备与报警现场图片｜Error 用法演示 -->
  <s-image
    src="https://mes.local/attachments/EQ-2023-204-missing.jpg"
    width="120px"
    height="120px"
  ></s-image>
  <s-image
    src="https://mes.local/attachments/EQ-2023-204-missing.jpg"
    width="120px"
    height="120px"
    class="ms-2"
  >
    <template #error>
      <span class="text-sm">加载未完成</span>
    </template>
  </s-image>
</template>
