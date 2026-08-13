<template>
  <s-navbar title="标题">
    <template #start>
      <s-navbar-item>返回上一页</s-navbar-item>
    </template>
    <template #end>
      <s-navbar-item #icon>
        <demo-icon name="search" />
      </s-navbar-item>
      <s-navbar-item>分享</s-navbar-item>
      <s-navbar-item #icon>
        <s-badge value="5">
          <demo-icon name="chat-dots" />
        </s-badge>
      </s-navbar-item>
    </template>
  </s-navbar>
</template>
