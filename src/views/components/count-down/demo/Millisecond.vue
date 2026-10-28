<template>
  <!-- 工业语境：停机窗口与保养倒计时｜Millisecond 用法演示 -->
  <s-count-down
    class="font-mono"
    :time="30 * 60 * 60 * 1000"
    format="HH 时 mm 分 ss 秒 SSS 毫秒"
    millisecond
  />
</template>
