<template>
  <!-- 工业语境：设备点检评分，未选为灰色心、已选为危险色心｜CustomIcon 用法演示 -->
  <s-flex vertical gap="medium">
    <s-rate :model-value="2.5" allow-half>
      <template #void-star>
        <demo-icon name="heart" color="var(--s-text-color-quaternary)" />
      </template>
      <template #star>
        <demo-icon name="heart" color="var(--s-color-danger)" />
      </template>
    </s-rate>
    <s-rate :model-value="2.5" allow-half void-text="好" text="好" />
  </s-flex>
</template>
