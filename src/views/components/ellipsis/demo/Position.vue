<template>
  <s-list card>
    <s-list-item>
      <s-ellipsis
        :content="contentEn"
        :rows="3"
        position="start"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
    <s-list-item>
      <s-ellipsis
        :content="contentEn"
        :rows="3"
        position="middle"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
    <s-list-item>
      <s-ellipsis
        :content="contentEn"
        :rows="3"
        position="end"
        expand-text="更多"
        collapse-text="收起"
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { contentEn } from './shared'
</script>
