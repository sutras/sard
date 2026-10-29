<template>
  <s-segmented v-model="ecl" :options="eclOptions" class="mb-5" />

  <s-qrcode text="https://mes.local/device/EQ-2024-017" :ecl="ecl" />
</template>

<script setup lang="ts">
import { type QrcodeECL } from 'sard'
import { ref } from 'vue'

const eclOptions: QrcodeECL[] = ['L', 'M', 'Q', 'H']
const ecl = ref<QrcodeECL>('M')
</script>
