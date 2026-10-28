<template>
  <!-- 演示车间大屏深色背景下的幽灵按钮：报警处置区需在半透明告警条上保持可读 -->
  <div class="p-3 bg-gray-700">
    <s-flex wrap gap="medium">
      <s-button ghost color="danger" variant="outlined" aria-label="确认告警">确认告警</s-button>
      <s-button ghost color="warning" variant="dashed" aria-label="转派维修">转派维修</s-button>
    </s-flex>
  </div>
</template>
