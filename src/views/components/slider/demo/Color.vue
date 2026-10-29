<template>
  <doc-title>单值选择</doc-title>
  <s-slider :model-value="50" color="var(--s-color-warning)" thumb-color="var(--s-color-warning)" />

  <doc-title>范围选择</doc-title>
  <s-slider
    range
    :model-value="[20, 80]"
    color="var(--s-color-warning)"
    thumb-color="var(--s-color-warning)"
  />
</template>
