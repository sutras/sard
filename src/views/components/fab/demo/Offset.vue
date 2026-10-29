<template>
  <s-fab draggable axis="both" v-model:offset="offset">
    <s-fab-item name="扫码报修" @click="onClick('扫码报修')">
      <demo-icon name="scan" />
    </s-fab-item>
    <s-fab-item name="转派维修" @click="onClick('转派维修')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="急停呼叫" @click="onClick('急停呼叫')">
      <demo-icon name="bell" />
    </s-fab-item>
  </s-fab>

  <div class="mt-7 text-center">
    <span>x: {{ offset.x.toFixed(0) }}</span>
    <span class="ms-1">y: {{ offset.y.toFixed(0) }}</span>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { ref } from 'vue'

const offset = ref({
  x: 200,
  y: 300,
})

const onClick = (name: string) => {
  toast(`点击了: ${name}`)
}
</script>
