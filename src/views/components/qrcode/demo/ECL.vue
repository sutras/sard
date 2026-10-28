<template>
  <!-- 工业语境：设备铭牌二维码（扫码报修）｜ECL 用法演示 -->
  <s-segmented v-model="ecl" :options="eclOptions" class="mb-20" />

  <s-qrcode text="https://mes.local/device/EQ-2024-017" :ecl="ecl" />
</template>

<script setup lang="ts">
import { type QrcodeECL } from 'sard'
import { ref } from 'vue'

const eclOptions: QrcodeECL[] = ['L', 'M', 'Q', 'H']
const ecl = ref<QrcodeECL>('M')
</script>
