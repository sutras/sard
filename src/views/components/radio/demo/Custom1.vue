<template>
  <!-- 工业语境：风险等级与班次单选｜Custom1 用法演示 -->
  <s-radio-group v-model="value" #default="{ toggle, value }">
    <s-flex gap="medium">
      <s-tag
        v-for="option in options"
        :key="option.value"
        :color="value.includes(option.value) ? 'primary' : 'default'"
        :variant="value.includes(option.value) ? 'solid' : 'filled'"
        @click="toggle(option.value)"
      >
        {{ option.label }}
      </s-tag>
    </s-flex>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option2')

const options = [
  { value: 'option1', label: '早班' },
  { value: 'option2', label: '中班' },
  { value: 'option3', label: '晚班' },
]
</script>
