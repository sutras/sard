<template>
  <s-list card>
    <s-list-item hover arrow title="弹出框" @click="visible = true" />
  </s-list>

  <s-popout title="标题" v-model:visible="visible">
    <div class="px-4 pb-4">
      <div>弹出框内容</div>
      <div>弹出框内容</div>
      <div>弹出框内容</div>
    </div>
  </s-popout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
