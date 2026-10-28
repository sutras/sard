<template>
  <!-- 演示车间手持端全宽主操作：同一动作在四个尺寸下保持「下发工单」语义与授权提示一致 -->
  <s-button block class="mb-3" size="xs" aria-label="下发工单（迷你尺寸）">下发工单</s-button>
  <s-button block class="mb-3" size="small" aria-label="下发工单（小尺寸）">下发工单</s-button>
  <s-button block class="mb-3" size="medium" aria-label="下发工单（默认尺寸）">下发工单</s-button>
  <s-button block class="mb-3" size="large" aria-label="下发工单（大尺寸）">
    下发工单（需班组长授权）
  </s-button>
</template>
