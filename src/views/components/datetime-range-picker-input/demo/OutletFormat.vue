<template>
  <!-- 工业语境：生产时段区间选择｜OutletFormat 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-datetime-range-picker-input
        v-model="value"
        title="选择产线日期"
        placeholder="选择产线日期"
        :tabs="['开始日期', '结束日期']"
        clearable
        type="yMd"
        outlet-format="YYYY年MM月DD日"
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为前一个月"
      arrow
      hover
      @click="value = [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()]"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<Date[]>()

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
