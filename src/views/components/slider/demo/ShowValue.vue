<template>
  <doc-title>单滑块</doc-title>
  <s-slider :model-value="50" show-value />

  <doc-title>双滑块</doc-title>
  <s-slider :model-value="[20, 80]" range show-value />
</template>
