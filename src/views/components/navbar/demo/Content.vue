<template>
  <!-- 工业语境：车间看板顶部导航与权限入口｜Content 用法演示 -->
  <s-navbar flow>
    <template #start>
      <s-navbar-item reverse>
        <template #icon>
          <Down />
        </template>
        城市
      </s-navbar-item>
    </template>
    <s-input placeholder="输入设备位号 / 批次号" style="border-radius: 9999px" />
    <template #end>
      <s-navbar-item>搜索</s-navbar-item>
    </template>
  </s-navbar>
</template>

<script setup lang="ts">
import { Down } from '@sard/icons'
</script>
