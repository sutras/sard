<template>
  <!-- 演示三端尺寸一致性：small=表格行内，medium=移动巡检，large=监控大屏，同一状态词三种尺寸 -->
  <s-flex vertical gap="medium">
    <s-flex wrap align="center" gap="medium">
      <s-tag size="small" variant="solid" color="success" data-surface="table">运行中</s-tag>
      <s-tag size="small" variant="solid" color="danger" data-surface="table">报警</s-tag>
      <s-tag size="small" variant="solid" color="default" data-surface="table">停机</s-tag>
    </s-flex>
    <s-flex wrap align="center" gap="medium">
      <s-tag variant="solid" color="success" data-surface="mobile">运行中</s-tag>
      <s-tag variant="solid" color="danger" data-surface="mobile">报警</s-tag>
      <s-tag variant="solid" color="default" data-surface="mobile">停机</s-tag>
    </s-flex>
    <s-flex wrap align="center" gap="medium">
      <s-tag size="large" variant="solid" color="success" data-surface="monitor">运行中</s-tag>
      <s-tag size="large" variant="solid" color="danger" data-surface="monitor">报警</s-tag>
      <s-tag size="large" variant="solid" color="default" data-surface="monitor">停机</s-tag>
    </s-flex>
  </s-flex>
</template>
