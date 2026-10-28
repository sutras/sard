<template>
  <!-- 工业语境：设备铭牌二维码（扫码报修）｜Icon 用法演示 -->
  <s-qrcode text="https://mes.local/device/EQ-2024-017" :icon="logo" />
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
</script>
