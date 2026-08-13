<template>
  <s-row>
    <s-col>
      <div class="layout-box">col1</div>
    </s-col>
    <s-col :order="-1">
      <div class="layout-box">col2 order:-1</div>
    </s-col>
  </s-row>

  <s-row>
    <s-col :order="2">
      <div class="layout-box">col1 order:2</div>
    </s-col>
    <s-col :order="1">
      <div class="layout-box">col2 order:1</div>
    </s-col>
    <s-col>
      <div class="layout-box">col3</div>
    </s-col>
  </s-row>
</template>
