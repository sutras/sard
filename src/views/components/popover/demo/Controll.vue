<template>
  <s-popover v-model:visible="visible" :outside-closable="false">
    <template #reference>
      <s-button>显示气泡弹出框</s-button>
    </template>

    <div class="p-4">
      <div class="font-bold text-lg">标题</div>
      <div class="mt-1">这是内容这是内容</div>
      <div class="flex gap-2 mt-3 justify-end">
        <s-button size="xs" variant="outlined" @click="visible = false">取消</s-button>
        <s-button size="xs" variant="solid" @click="visible = false">确定</s-button>
      </div>
    </div>
  </s-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
