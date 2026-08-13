<template>
  <s-checkbox-group v-model="value" #default="{ toggle }">
    <s-list card>
      <s-list-item
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        hover
        @click="toggle(option.value)"
        #icon
      >
        <s-checkbox readonly :value="option.value" />
      </s-list-item>
    </s-list>
  </s-checkbox-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['option2'])

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]
</script>
