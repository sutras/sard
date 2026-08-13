<template>
  <s-list card>
    <s-list-item>
      <s-popout-input
        v-model="value"
        placeholder="请选择"
        clearable
        @clear="toast('清除')"
        @click="toast('点击了')"
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="设置值" hover arrow @click="value = '输入框内容'" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'

const value = ref('')

const onChange = (value: string) => {
  console.log('change', value)
}
</script>
