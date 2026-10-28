<template>
  <!-- 演示按钮尺寸与操作频率的对应：xs=表格行内、small=卡片操作、medium=表单提交、large=现场主操作 -->
  <s-flex wrap align="center" gap="medium">
    <s-button size="xs" aria-label="行内派工">派工</s-button>
    <s-button size="small" aria-label="卡片内确认点检">确认点检</s-button>
    <s-button size="medium" aria-label="提交工艺参数">提交参数</s-button>
    <s-button size="large" aria-label="下发生产工单">下发生产工单</s-button>
  </s-flex>
</template>
