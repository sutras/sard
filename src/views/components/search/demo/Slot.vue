<template>
  <s-search placeholder="请输入关键词" shape="round" style="padding-inline-start: 4px">
    <template #prepend>
      <s-button variant="link" size="small" color="secondary" style="margin-inline-end: 4px">
        <demo-icon name="upc-scan" size="16px" />
      </s-button>
    </template>

    <template #input-prepend>
      <s-button variant="link" size="xs" color="secondary">
        <CaretDown />
      </s-button>
    </template>

    <template #input-append>
      <s-button variant="link" size="xs" color="secondary">
        <demo-icon name="camera" size="18px" />
      </s-button>
    </template>
  </s-search>

  <s-search
    placeholder="请输入关键词"
    shape="round"
    style="margin-top: 20px; padding-inline-start: 6px; padding-inline-end: 4px"
  >
    <template #prepend>
      <s-button variant="link" size="xs" color="secondary" style="margin-inline-end: 6px">
        <Left class="text-lg" />
      </s-button>
    </template>

    <template #append>
      <s-button variant="link" size="xs" color="secondary" style="margin-inline-start: 6px">
        <demo-icon name="list-task" size="20px" />
      </s-button>
    </template>
  </s-search>
</template>

<script setup lang="ts">
import { CaretDown, Left } from '@sard/icons'
</script>
