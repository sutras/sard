<template>
  <!-- 工业语境：风险等级与班次单选｜Custom3 用法演示 -->
  <s-radio-group v-model="value" #default="{ toggle }">
    <s-list card>
      <s-list-item
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        hover
        @click="toggle(option.value)"
        #icon
      >
        <s-radio readonly :value="option.value" />
      </s-list-item>
    </s-list>
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
