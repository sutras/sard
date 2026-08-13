<template>
  <s-radio-group v-model="value" #default="{ toggle, value }">
    <s-space>
      <s-tag
        v-for="option in options"
        :key="option.value"
        :color="value.includes(option.value) ? 'primary' : 'default'"
        :variant="value.includes(option.value) ? 'solid' : 'filled'"
        @click="toggle(option.value)"
      >
        {{ option.label }}
      </s-tag>
    </s-space>
  </s-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('option2')

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
