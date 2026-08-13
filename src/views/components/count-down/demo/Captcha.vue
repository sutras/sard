<template>
  <s-input v-model="value" placeholder="请输入验证码">
    <template #append>
      <s-button variant="link" compact :loading="loading" :disabled="disabled" @click="onClick">
        <s-count-down
          v-if="disabled"
          :time="1000 * 8"
          format="重发验证码(s)"
          @finish="disabled = false"
        />
        <span v-else-if="loading">正在发送</span>
        <span v-else>发送验证码</span>
      </s-button>
    </template>
  </s-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'

const value = ref('')
const loading = ref(false)
const disabled = ref(false)

const sendCaptcha = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}

const onClick = () => {
  loading.value = true
  sendCaptcha()
    .then(() => {
      toast('已发送验证码')
      disabled.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
