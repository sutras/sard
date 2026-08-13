<template>
  <s-card
    style="
      --s-card-bg: var(--s-color-danger);
      --s-card-border-color: white;
      --s-card-bg-active: rgba(var(--s-color-danger-rgb), 0.9);
      --s-card-footer-border-style: dashed;
      --s-card-border-width: 2px;
      color: white;
    "
    title="Card title"
    footer="Card footer"
    hover
  >
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </s-card>

  <s-card class="mt-7" hover>
    <template #icon>
      <s-text class="flex mt-1" color="primary" size="large">
        <PencilSquare />
      </s-text>
    </template>

    <template #title>
      <div class="flex gap-2 font-bold">
        <span>实施安装工单</span>
        <span>GB20250627</span>
      </div>
      <s-text tag="p" class="mt-2" color="primary" size="small">待评价</s-text>
    </template>

    <s-descriptions label-width="5em">
      <s-descriptions-item label="机构">广州天河妇幼保健院</s-descriptions-item>
      <s-descriptions-item label="创建时间">2025-06-27 22:25:46</s-descriptions-item>
      <s-descriptions-item label="负责人">张三</s-descriptions-item>
    </s-descriptions>
  </s-card>
</template>

<script setup lang="ts">
import { PencilSquare } from '@sard/icons'
</script>
