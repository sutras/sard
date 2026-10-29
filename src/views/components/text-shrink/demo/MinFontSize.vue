<template>
  <s-card>
    <div v-for="(goods, index) in orderGoods" :key="goods" :class="index > 0 && 'mt-4'">
      <div class="flex items-center gap-3">
        <span
          class="w-[118px] shrink-0 whitespace-nowrap text-[11px] text-(--s-text-color-tertiary) [font-family:var(--s-font-family-code)]"
        >
          默认下限 1px
        </span>
        <div
          class="w-[132px] shrink-0 rounded bg-(--s-bg-color-layout) px-1.5 py-1 text-[13px] leading-normal"
        >
          <s-text-shrink :text="goods" />
        </div>
      </div>

      <div class="mt-1.5 flex items-center gap-3">
        <span
          class="w-[118px] shrink-0 whitespace-nowrap text-[11px] text-(--s-color-primary) [font-family:var(--s-font-family-code)]"
        >
          min-font-size: 10
        </span>
        <div
          class="w-[132px] shrink-0 rounded bg-(--s-bg-color-layout) px-1.5 py-1 text-[13px] leading-normal"
        >
          <s-text-shrink :text="goods" :min-font-size="10" />
        </div>
      </div>
    </div>

    <s-text tag="p" size="small" color="tertiary" class="mt-4.5 leading-normal">
      列宽固定 132px。默认缩到塞下为止，长位号常缩成 5px 灰线；设
      <code
        class="rounded bg-(--s-bg-color-layout) px-1 py-0.5 text-[11px] [font-family:var(--s-font-family-code)]"
      >
        min-font-size="10"
      </code>
      后到 10px 即改为省略号。
    </s-text>
  </s-card>
</template>

<script setup lang="ts">
import { orderGoods } from './shared'
</script>
