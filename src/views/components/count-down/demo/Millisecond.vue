<template>
  <s-count-down
    class="font-mono"
    :time="30 * 60 * 60 * 1000"
    format="HH 时 mm 分 ss 秒 SSS 毫秒"
    millisecond
  />
</template>
