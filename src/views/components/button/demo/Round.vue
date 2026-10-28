<template>
  <!-- 演示巡检端圆形按钮：圆形用于单次确认类动作（点检打卡 / 报警确认），不做危险操作 -->
  <s-flex wrap gap="medium">
    <s-button round variant="solid" aria-label="确认点检">确认点检</s-button>
    <s-button round variant="outlined" aria-label="确认点检（描边）">确认点检</s-button>
    <s-button round variant="dashed" aria-label="补录参数">补录参数</s-button>
    <s-button round variant="filled" aria-label="查看详情">查看详情</s-button>
    <s-button round variant="text" aria-label="切换班次">切换班次</s-button>
    <s-button round variant="link" aria-label="查看标准">作业标准</s-button>
  </s-flex>
</template>
