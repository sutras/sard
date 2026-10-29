<template>
  <s-list card>
    <s-list-item>
      <s-popout-input
        v-model="value"
        placeholder="选择产线"
        clearable
        @clear="toast('已清除产线筛选')"
        @click="toast('展开产线选择')"
        @change="onChange"
      />
    </s-list-item>
    <s-list-item title="设置值" hover arrow @click="value = '输入框参数明细'" />
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
