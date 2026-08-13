<template>
  <s-list card>
    <s-list-item>
      <s-select-input
        v-model="value"
        v-model:visible="visible"
        title="请选择"
        placeholder="请选择"
        filterable
        filter-placeholder="请输入过滤关键词"
        remote
        :remote-method="remoteMethod"
        :options="listData"
        :option-keys="{ label: 'name', value: 'code' }"
        :map-label="mapLabel"
        @change="onChange"
      />
    </s-list-item>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '请选择' }}
      </template>
    </s-list-item>
    <s-list-item title="设置为：440100 (广州市)" arrow hover @click="value = 440100" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getCities } from '@/api'

const visible = ref(false)
const value = ref<number>()

const mapLabel = {
  440100: '广州市',
}

const onChange = (value: any) => {
  console.log('change', value)
}

const listData = ref<
  {
    code: string
    name: string
  }[]
>([])

const remoteMethod = async (search: string, page: number, isRefresh: boolean) => {
  return getCities({ name: search, page }).then(({ list = [], total = 0 }) => {
    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}
</script>
