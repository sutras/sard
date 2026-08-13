<template>
  <s-list card>
    <s-list-item title="当前值" :value="value || '暂无输入'" />
    <s-list-item title="打开数字键盘" arrow hover @click="visible = true" />
    <s-keyboard-popout
      v-model:visible="visible"
      title="请输入数字"
      transparent
      show-shadow
      @input="onInput"
      @delete="onDelete"
      @confirm="onConfirm"
    />
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')

const onInput = (key: string) => {
  value.value += key
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}

const onConfirm = () => {
  toast(`输入完成，值：${value.value}`)
  value.value = ''
}
</script>
