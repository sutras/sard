<template>
  <doc-page gray title="DatetimeRangePickerInput 日期时间范围输入框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="输入框日期格式">
      <OutletFormat />
    </doc-demo>

    <doc-demo title="绑定值的格式">
      <ValueFormat />
    </doc-demo>

    <doc-demo title="插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import OutletFormat from './demo/OutletFormat.vue'
import ValueFormat from './demo/ValueFormat.vue'
import Slot from './demo/Slot.vue'
</script>
