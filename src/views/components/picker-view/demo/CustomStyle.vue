<template>
  <s-list card>
    <s-list-item>
      <s-picker-view
        v-model:value="value"
        indicator-style="border: 1px solid var(--s-color-primary); border-radius: 8px; height: 30px"
        style="height: 120px"
      >
        <s-picker-view-column>
          <div v-for="item in years" :key="item" class="item">{{ item }}</div>
        </s-picker-view-column>
      </s-picker-view>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value)" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const years = Array(20)
  .fill(0)
  .map((_, index) => 2000 + index + '年')

const value = ref<number[]>([6])
</script>

<style scoped>
.item {
  line-height: 30px;
  text-align: center;
}
</style>
