<template>
  <!-- 演示合规半圆标签：左侧标记「安全相关字段」，右侧标记「需授权」，与状态徽标区分开 -->
  <s-flex vertical gap="medium">
    <s-flex wrap gap="medium">
      <s-tag mark="left" variant="solid" color="danger">安全相关</s-tag>
      <s-tag mark="left" variant="solid" color="warning">需授权</s-tag>
      <s-tag mark="left" variant="solid" color="primary">工艺参数</s-tag>
      <s-tag mark="left" variant="solid" color="success">已点检</s-tag>
      <s-tag mark="left" variant="solid" color="default">可编辑</s-tag>
    </s-flex>

    <s-flex wrap gap="medium">
      <s-tag mark="right" variant="solid" color="danger">L3 不可逆</s-tag>
      <s-tag mark="right" variant="solid" color="warning">L2 需审批</s-tag>
      <s-tag mark="right" variant="solid" color="primary">L1 可回退</s-tag>
      <s-tag mark="right" variant="solid" color="success">联锁已闭合</s-tag>
      <s-tag mark="right" variant="solid" color="default">只读</s-tag>
    </s-flex>
  </s-flex>
</template>
