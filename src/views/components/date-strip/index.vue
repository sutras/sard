<template>
  <doc-page gray title="DateStrip 日期横条">
    <doc-demo title="基础用法">
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

    <doc-demo title="过滤日期">
      <FilterDate />
    </doc-demo>

    <doc-demo title="格式化日期">
      <Formatter />
    </doc-demo>

    <doc-demo title="展示农历">
      <ShowLunar />
    </doc-demo>

    <doc-demo title="自定义样式">
      <Style />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Type from './demo/Type.vue'
import MinMax from './demo/MinMax.vue'
import MaxDays from './demo/MaxDays.vue'
import DisabledDate from './demo/DisabledDate.vue'
import FilterDate from './demo/FilterDate.vue'
import Formatter from './demo/Formatter.vue'
import ShowLunar from './demo/ShowLunar.vue'
import Style from './demo/Style.vue'
</script>
