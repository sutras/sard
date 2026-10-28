<template>
  <!-- 工业语境：生产时段区间弹层｜Basic 用法演示 -->
  <s-datetime-range-picker-popout
    v-model="date"
    v-model:visible="visible"
    title="选择产线"
    :tabs="['开始日期', '结束日期']"
    type="yMd"
    @change="onChange"
  />

  <s-list card>
    <s-list-item>
      <s-button @click="visible = true">
        {{ date ? displayText : '选择产线' }}
      </s-button>
    </s-list-item>
    <s-list-item
      title="设置为前一个月"
      arrow
      hover
      @click="date = [new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date()]"
    />
    <s-list-item title="清空" arrow hover @click="date = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { formatDate } from 'sard'
import { computed, ref } from 'vue'

const visible = ref(false)
const date = ref<Date[]>()

const displayText = computed(() => {
  return JSON.stringify(date.value?.map((item) => formatDate(item, 'YYYY-MM-DD')))
})

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
