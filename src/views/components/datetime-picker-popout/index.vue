<template>
  <doc-page gray title="DatetimePickerPopout 日期时间弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>

    <doc-demo title="自定义日期范围">
      <MinMax />
    </doc-demo>

    <doc-demo title="过滤器">
      <Filter />
    </doc-demo>

    <doc-demo title="格式化">
      <Formatter />
    </doc-demo>

    <doc-demo title="农历">
      <Calendar />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import MinMax from './demo/MinMax.vue'
import Filter from './demo/Filter.vue'
import Formatter from './demo/Formatter.vue'
import Calendar from './demo/Calendar.vue'
</script>
