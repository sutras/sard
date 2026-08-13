<template>
  <s-image src="https://fastly.jsdelivr.net/nonexistent.jpg" width="120px" height="120px"></s-image>
  <s-image
    src="https://fastly.jsdelivr.net/nonexistent.jpg"
    width="120px"
    height="120px"
    class="ms-2"
  >
    <template #error>
      <span class="text-sm">加载失败</span>
    </template>
  </s-image>
</template>
