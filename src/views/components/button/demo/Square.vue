<template>
  <!-- 演示方形按钮：等宽方块用于设备面板上的固定位置按钮，避免误触相邻操作 -->
  <s-flex wrap gap="medium">
    <s-button square variant="solid" aria-label="启动设备">启动</s-button>
    <s-button square variant="outlined" aria-label="停止进给">停止</s-button>
    <s-button square variant="dashed" aria-label="点动模式">点动</s-button>
    <s-button square variant="filled" aria-label="回零">回零</s-button>
    <s-button square variant="text" aria-label="手动模式">手动</s-button>
    <s-button square variant="link" aria-label="查看操作手册">手册</s-button>
  </s-flex>
</template>
