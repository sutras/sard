<template>
  <s-list card>
    <s-list-item>
      <s-popout-input
        v-model="value"
        placeholder="选择工位"
        clearable
        @clear="toast('已清除工位')"
        @click="toast('展开工位选择')"
        @change="onChange"
      >
        <template #prepend>工位:</template>
        <template #append>(MES)</template>
      </s-popout-input>
    </s-list-item>
    <s-list-item title="填入 ST-11" hover arrow @click="value = 'ST-11'" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'sard'

const value = ref('')

const onChange = (value: any) => {
  console.log('change', value)
}
</script>
