<template>
  <doc-page gray title="CalendarPopout 日历弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>

    <doc-demo title="自定义日期范围">
      <MinMax />
    </doc-demo>

    <doc-demo title="最多选择天数">
      <MaxDays />
    </doc-demo>

    <doc-demo title="禁用日期">
      <DisabledDate />
    </doc-demo>

    <doc-demo title="自定义起始周">
      <WeekStartsOn />
    </doc-demo>

    <doc-demo title="格式化日期">
      <Formatter />
    </doc-demo>

    <doc-demo title="展示多个月">
      <Several />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import MinMax from './demo/MinMax.vue'
import MaxDays from './demo/MaxDays.vue'
import DisabledDate from './demo/DisabledDate.vue'
import WeekStartsOn from './demo/WeekStartsOn.vue'
import Formatter from './demo/Formatter.vue'
import Several from './demo/Several.vue'
</script>
