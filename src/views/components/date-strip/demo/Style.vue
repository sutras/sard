<template>
  <s-list card>
    <s-list-item>
      <s-date-strip
        v-model="value"
        style="
          --s-date-strip-column-gap: 0px;
          --s-date-strip-item-radius: 0px;
          --s-date-strip-item-bg-selected: var(--s-color-warning);
          --s-date-strip-item-color-today: var(--s-color-warning);
          --s-date-strip-item-bg-middle: rgba(var(--s-color-warning-rgb), 0.15);
          --s-date-strip-item-week-order: 3;
          background: var(--s-fill-color-tertiary);
        "
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="当前值" :value="formatDate(value, 'YYYY-MM-DD')" />
  </s-list>
</template>

<script setup lang="ts">
import { formatDate } from 'sard'
import { ref } from 'vue'

const value = ref<Date>(new Date())

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
