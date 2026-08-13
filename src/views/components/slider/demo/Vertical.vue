<template>
  <div style="display: flex; flex-direction: row">
    <div>
      <doc-title>单值选择</doc-title>
      <s-slider :model-value="50" vertical show-value />
    </div>

    <div style="margin-inline-start: 50px">
      <doc-title>范围选择</doc-title>
      <s-slider range :model-value="[20, 80]" vertical show-value value-position="left" />
    </div>
  </div>
</template>
