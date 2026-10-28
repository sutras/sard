<template>
  <!-- 演示状态徽标圆角样式：巡检端圆角复用同一状态词，保证监控大屏与移动端语义一致 -->
  <s-flex vertical gap="medium">
    <s-flex wrap gap="medium">
      <s-tag round variant="filled" color="default" data-status="STOP">停机</s-tag>
      <s-tag round variant="filled" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag round variant="filled" color="success" data-status="RUN">运行中</s-tag>
      <s-tag round variant="filled" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag round variant="filled" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>

    <s-flex wrap gap="medium">
      <s-tag round variant="solid" color="default" data-status="STOP">停机</s-tag>
      <s-tag round variant="solid" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag round variant="solid" color="success" data-status="RUN">运行中</s-tag>
      <s-tag round variant="solid" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag round variant="solid" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>

    <s-flex wrap gap="medium">
      <s-tag round variant="outlined" color="default" data-status="STOP">停机</s-tag>
      <s-tag round variant="outlined" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag round variant="outlined" color="success" data-status="RUN">运行中</s-tag>
      <s-tag round variant="outlined" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag round variant="outlined" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>
  </s-flex>
</template>
