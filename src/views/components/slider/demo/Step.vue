<template>
  <doc-title>步长：10</doc-title>
  <s-slider :model-value="50" show-value :step="10" />

  <doc-title>步长：12.3</doc-title>
  <s-slider range :model-value="[50, 80]" show-value :step="12.3" />
</template>
