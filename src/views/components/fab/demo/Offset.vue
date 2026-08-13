<template>
  <s-fab draggable axis="both" v-model:offset="offset">
    <s-fab-item name="首页" @click="onClick('首页')">
      <demo-icon name="house-door" />
    </s-fab-item>
    <s-fab-item name="分享好友" @click="onClick('分享好友')">
      <demo-icon name="share" />
    </s-fab-item>
    <s-fab-item name="收藏" @click="onClick('收藏')">
      <demo-icon name="star" />
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
