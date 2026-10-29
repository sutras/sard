<template>
  <s-list card>
    <s-list-item title="当前类型" :value="type" />
    <s-list-item title="当前值" :value="value || '暂无输入'" />
    <s-list-item>
      <s-segmented v-model="type" :options="types" />
    </s-list-item>
    <s-list-item title="打开键盘" arrow hover @click="visible = true" />
    <s-keyboard-popout
      v-model:visible="visible"
      :title="`类型：${type}`"
      :type="type"
      @input="onInput"
      @delete="onDelete"
    >
      <div class="flex items-center justify-center text-center h-10">
        {{ value || '暂无输入' }}
      </div>
    </s-keyboard-popout>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const types = ['number', 'digit', 'idcard', 'random']
const type = ref<'number' | 'digit' | 'idcard' | 'random'>('number')
const visible = ref(false)
const value = ref('')

const onInput = (key: string) => {
  value.value += key
}

const onDelete = () => {
  value.value = value.value.slice(0, -1)
}
</script>
