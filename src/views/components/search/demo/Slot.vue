<template>
  <!-- 工业语境：设备位号与批次号检索｜Slot 用法演示 -->
  <s-search placeholder="输入设备位号 / 批次号" shape="round" style="padding-inline-start: 4px">
    <template #prepend>
      <s-button variant="link" size="small" color="secondary" style="margin-inline-end: 4px">
        <demo-icon name="scan" size="16px" />
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
    placeholder="输入设备位号 / 批次号"
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
        <demo-icon name="work-order" size="20px" />
      </s-button>
    </template>
  </s-search>
</template>

<script setup lang="ts">
import { CaretDown, Left } from '@sard/icons'
</script>
