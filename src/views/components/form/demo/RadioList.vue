<template>
  <s-radio-group v-model="value" #default="{ toggle }">
    <s-list hide-border>
      <s-list-item
        v-for="option in options"
        :key="option.value"
        :title="option.label"
        @click="toggle(option.value)"
        #icon
      >
        <s-radio readonly :value="option.value" />
      </s-list-item>
    </s-list>
  </s-radio-group>
</template>

<script setup lang="ts">
const value = defineModel<string>()

defineProps<{
  options: {
    label: string
    value: string
  }[]
}>()
</script>
