<template>
  <s-list card>
    <s-list-item>
      <s-picker
        v-model="value"
        :columns="columns"
        :option-keys="{ label: 'name', value: 'name' }"
        @change="onChange"
      >
        <template #option="{ option }">
          <span :class="['cake', `cake-${option.icon}`]" />
          <span class="ms-2 font-bold">
            {{ option.name }}
          </span>
        </template>
      </s-picker>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item title="设置为: 泡芙" arrow hover @click="value = '泡芙'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPrizes } from '../../lucky-draw/demo/utils'

const columns = getPrizes()

const value = ref<string | undefined>('布丁')

const onChange = (value: number[]) => {
  console.log('change', value)
}
</script>
