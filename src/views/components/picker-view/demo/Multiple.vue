<template>
  <s-list card>
    <s-list-item>
      <s-picker-view v-model:value="value">
        <s-picker-view-column>
          <div v-for="item in years" :key="item" class="item">{{ item }}</div>
        </s-picker-view-column>
        <s-picker-view-column>
          <div v-for="item in months" :key="item" class="item">{{ item }}</div>
        </s-picker-view-column>
        <s-picker-view-column>
          <div v-for="item in days" :key="item" class="item">{{ item }}</div>
        </s-picker-view-column>
      </s-picker-view>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value)" />
    <s-list-item title="设置为: 2003年10月15日" arrow hover @click="value = [3, 9, 14]" />
    <s-list-item title="清空" arrow hover @click="value = []" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const years = Array(10)
  .fill(0)
  .map((_, index) => 2000 + index + '年')

const months = Array(12)
  .fill(0)
  .map((_, index) => 1 + index + '月')

const days = Array(31)
  .fill(0)
  .map((_, index) => 1 + index + '日')

const value = ref<number[]>([5, 4, 14])
</script>

<style scoped>
.item {
  line-height: 48px;
  text-align: center;
}
</style>
