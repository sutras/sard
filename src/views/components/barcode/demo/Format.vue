<template>
  <s-list card>
    <s-list-item>
      <s-segmented v-model="format" :options="formatOptions" :ellipsis="false" />
    </s-list-item>
    <s-list-item>
      <s-barcode :value="samples[format]" :format="format" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type BarcodeFormat } from 'sard'

const formatOptions: BarcodeFormat[] = ['CODE128', 'EAN13', 'UPC-A', 'ITF14']

const samples: Record<BarcodeFormat, string> = {
  CODE128: 'Hello123',
  EAN13: '590123412345',
  'UPC-A': '12345678901',
  ITF14: '1234567890123',
}

const format = ref<BarcodeFormat>('CODE128')
</script>
