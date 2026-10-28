<template>
  <!-- 工业语境：看板布局｜Basic 用法演示 -->
  <s-row>
    <s-col>
      <div class="layout-box">span</div>
    </s-col>
    <s-col>
      <div class="layout-box">span</div>
    </s-col>
  </s-row>

  <s-row>
    <s-col :span="4">
      <div class="layout-box">span-4</div>
    </s-col>
    <s-col :span="8">
      <div class="layout-box">span-8</div>
    </s-col>
  </s-row>

  <s-row>
    <s-col :span="3">
      <div class="layout-box">span-3</div>
    </s-col>
    <s-col>
      <div class="layout-box">span</div>
    </s-col>
    <s-col span="auto">
      <div class="layout-box">auto</div>
    </s-col>
  </s-row>
</template>
