<template>
  <s-radio-group v-model="value" #default="{ toggle, value }">
    <s-list card>
      <s-list-item
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        hover
        @click="toggle(option.value)"
      >
        <template #value>
          <Success v-if="option.value === value" class="text-base text-(--s-color-danger)" />
        </template>
      </s-list-item>
    </s-list>
  </s-radio-group>
</template>

<script setup lang="ts">
import { Success } from '@sard/icons'
import { ref } from 'vue'

const value = ref('option2')

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
