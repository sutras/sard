<template>
  <s-list card>
    <s-list-item>
      <s-datetime-range-picker-input
        v-model="value"
        v-model:visible="visible"
        title="请选择日期"
        placeholder="请选择日期"
        :tabs="['开始日期', '结束日期']"
        clearable
        type="yMd"
      >
        <template #header>
          <div class="flex flex-wrap justify-center">
            <s-button
              v-for="item in shortcuts"
              :key="item.text"
              variant="link"
              @click="onShortcut(item)"
            >
              {{ item.text }}
            </s-button>
          </div>
        </template>
      </s-datetime-range-picker-input>
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
const visible = ref(false)

const shortcuts = [
  {
    text: '上周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '上月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
]

const onShortcut = (item: (typeof shortcuts)[number]) => {
  value.value = item.value()
  visible.value = false
}
</script>
