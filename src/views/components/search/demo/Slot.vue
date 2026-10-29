<template>
  <s-search placeholder="输入设备位号 / 批次号" shape="round" style="padding-inline-start: 4px">
    <template #prepend>
      <s-button type="text" size="small" style="margin-inline-end: 4px">
        <demo-icon name="scan" size="16px" />
      </s-button>
    </template>

    <template #input-prepend>
      <s-button type="text" size="xs">
        <CaretDown />
      </s-button>
    </template>

    <template #input-append>
      <s-button type="text" size="xs">
        <demo-icon name="camera" size="18px" />
      </s-button>
    </template>
  </s-search>

  <s-search
    placeholder="输入设备位号 / 批次号"
    shape="round"
    style="margin-top: 20px; padding-inline-start: 6px; padding-inline-end: 4px"
  >
    <template #prepend>
      <s-button type="text" size="xs" style="margin-inline-end: 6px">
        <Left class="text-lg" />
      </s-button>
    </template>

    <template #append>
      <s-button type="text" size="xs" style="margin-inline-start: 6px">
        <demo-icon name="work-order" size="20px" />
      </s-button>
    </template>
  </s-search>
</template>

<script setup lang="ts">
import { CaretDown, Left } from '@sard/icons'
</script>
