<template>
  <s-space direction="vertical">
    <s-rate :model-value="2.5" allow-half>
      <template #void-star>
        <demo-icon name="heart" />
      </template>
      <template #star>
        <demo-icon name="heart-fill" />
      </template>
    </s-rate>
    <s-rate :model-value="2.5" allow-half void-text="好" text="好" />
  </s-space>
</template>
