<template>
  <s-list card>
    <s-list-item title="打开键盘" arrow hover @click="visible = true" />
    <s-keyboard-popout
      v-model:visible="visible"
      title="安全键盘"
      :show-cancel="false"
      :show-confirm="false"
      @input="onInput"
      @delete="onDelete"
      @before-enter="value = ''"
    >
      <div class="px-8 pb-8">
        <s-password-input v-model="value" type="underlined" :length="6" custom-keyboard focused />
      </div>
    </s-keyboard-popout>
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { ref } from 'vue'

const visible = ref(false)
const value = ref('')

const onInput = (key: string) => {
  value.value = (value.value + key).slice(0, 6)

  if (value.value.length === 6) {
    visible.value = false
    toast(`输入完成，密码：${value.value}`)
  }
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}
</script>
