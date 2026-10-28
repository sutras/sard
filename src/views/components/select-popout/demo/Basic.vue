<template>
  <!-- 工业语境：产线弹层单选 —— 选项来自 MES 产线主数据，选中值即产线编码 -->
  <s-select-popout
    v-model="value"
    v-model:visible="visible"
    title="选择产线"
    aria-label="选择产线"
    @change="onChange"
  >
    <s-select-option v-for="item in lines" :key="item.code" :label="item.name" :value="item.code" />
  </s-select-popout>

  <s-list card>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? lineLabel(value) : '选择产线' }}
      </template>
    </s-list-item>
    <s-list-item title="切换为：机加工一线" arrow hover @click="value = 1001" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const lines = [
  { code: 1001, name: '机加工一线' },
  { code: 1002, name: '注塑二线' },
  { code: 1003, name: '压铸四线' },
  { code: 1004, name: '包装五线' },
]

const visible = ref(false)
const value = ref<number>()

const lineLabel = (code: number) => {
  const line = lines.find((item) => item.code === code)
  return line ? `${line.name}（${line.code}）` : String(code)
}

const onChange = (value: any) => {
  console.log('产线切换', value)
}
</script>
