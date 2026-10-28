<template>
  <!-- 演示状态徽标色板：颜色即状态机语义（灰=停机，蓝=待机，绿=运行中，黄=维护中，红=报警） -->
  <s-flex vertical gap="medium">
    <s-flex wrap gap="medium">
      <s-tag variant="filled" color="default" data-status="STOP">停机</s-tag>
      <s-tag variant="filled" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag variant="filled" color="success" data-status="RUN">运行中</s-tag>
      <s-tag variant="filled" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag variant="filled" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>

    <s-flex wrap gap="medium">
      <s-tag variant="solid" color="default" data-status="STOP">停机</s-tag>
      <s-tag variant="solid" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag variant="solid" color="success" data-status="RUN">运行中</s-tag>
      <s-tag variant="solid" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag variant="solid" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>

    <s-flex wrap gap="medium">
      <s-tag variant="outlined" color="default" data-status="STOP">停机</s-tag>
      <s-tag variant="outlined" color="primary" data-status="IDLE">待机</s-tag>
      <s-tag variant="outlined" color="success" data-status="RUN">运行中</s-tag>
      <s-tag variant="outlined" color="warning" data-status="MAINT">维护中</s-tag>
      <s-tag variant="outlined" color="danger" data-status="ALARM">报警</s-tag>
    </s-flex>
  </s-flex>
</template>
