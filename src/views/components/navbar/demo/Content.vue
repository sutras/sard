<template>
  <s-navbar flow>
    <template #start>
      <s-navbar-item reverse>
        <template #icon>
          <Down />
        </template>
        城市
      </s-navbar-item>
    </template>
    <s-input placeholder="请输入关键词" style="border-radius: 9999px" />
    <template #end>
      <s-navbar-item>搜索</s-navbar-item>
    </template>
  </s-navbar>
</template>

<script setup lang="ts">
import { Down } from '@sard/icons'
</script>
