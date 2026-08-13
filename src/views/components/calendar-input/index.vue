<template>
  <doc-page gray title="CalendarInput 日历输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="输入框日期格式">
      <OutletFormat />
    </doc-demo>

    <doc-demo title="绑定值的格式">
      <ValueFormat />
    </doc-demo>

    <doc-demo title="类型">
      <Type />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import OutletFormat from './demo/OutletFormat.vue'
import ValueFormat from './demo/ValueFormat.vue'
import Type from './demo/Type.vue'
</script>
