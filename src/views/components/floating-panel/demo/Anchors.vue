<template>
  <doc-page gray title="自定义锚点">
    <s-floating-panel v-model:height="height" :anchors="anchors">
      <div style="padding: 10px; text-align: center">
        {{ height.toFixed(0) }}
      </div>
      <s-list>
        <s-list-item v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)"></s-list-item>
      </s-list>
    </s-floating-panel>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const anchors = [100, Math.round(0.4 * window.innerHeight), Math.round(0.7 * window.innerHeight)]

const height = ref(anchors[0])
</script>
