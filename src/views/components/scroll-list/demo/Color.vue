<template>
  <s-scroll-list
    scrollbar-bg="rgba(var(--s-color-danger-rgb), 0.2)"
    thumb-bg="var(--s-color-danger)"
  >
    <div class="flex flex-col gap-5">
      <div v-for="(row, i) in rows" :key="i" class="flex gap-8">
        <div
          v-for="(item, j) in row"
          :key="j"
          class="flex flex-col justify-center items-center w-15 flex-none"
        >
          <Image class="text-2xl" />
          <div class="mt-2 text-sm text-(--s-text-color-secondary)">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </s-scroll-list>
</template>

<script setup lang="ts">
import { Image } from '@sard/icons'
import { ref } from 'vue'

const rows = ref(
  Array(16)
    .fill(0)
    .reduce(
      (rows, _, i) => {
        rows[i % 2].push({
          text: '文字' + (i + 1),
        })
        return rows
      },
      [[], []],
    ),
)
</script>
