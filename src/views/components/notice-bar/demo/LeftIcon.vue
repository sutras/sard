<template>
  <s-notice-bar>
    <template #left-icon>
      <demo-icon name="bell" size="16px" />
    </template>
    这是一条很长很长很长很长很长很长很长很长很长很长的公告！
  </s-notice-bar>

  <s-notice-bar hideLeftIcon>这是一条很长很长很长很长很长很长很长很长很长很长的公告！</s-notice-bar>

  <s-notice-bar>
    <template #left-icon>
      <span style="font-size: 16px">消息:</span>
    </template>
    这是一条很长很长很长很长很长很长很长很长很长很长的公告！
  </s-notice-bar>
</template>
