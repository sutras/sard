<template>
  <doc-title>单值选择</doc-title>
  <s-slider :model-value="50">
    <template #end-thumb="{ value }">
      <div class="slider-thumb">{{ value }}</div>
    </template>
  </s-slider>

  <doc-title>范围选择</doc-title>
  <s-slider range :model-value="[20, 80]">
    <template #start-thumb="{ value }">
      <div class="slider-thumb">{{ value }}</div>
    </template>
    <template #end-thumb="{ value }">
      <div class="slider-thumb">{{ value }}</div>
    </template>
  </s-slider>
</template>

<style lang="scss" scoped>
.slider-thumb {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 24px;
  border-radius: var(--s-border-radius-sm);
  font-size: var(--s-font-size);
  color: #fff;
  background-color: var(--s-color-warning);
  box-shadow: var(--s-box-shadow-tertiary);
}
</style>
