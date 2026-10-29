<template>
  <s-list card>
    <s-list-item>
      <s-select-input
        ref="selectInput"
        v-model="value"
        v-model:visible="visible"
        title="选择产线"
        placeholder="选择产线"
        filterable
        filter-placeholder="输入设备位号过滤关键词"
        v-model:filter-value="filterValue"
        :filter-loading="status === LoadMoreStatus.LOADING"
        :options="listData"
        :option-keys="{ label: 'name', value: 'code' }"
        :map-label="mapLabel"
        @change="onChange"
      >
        <template #bottom>
          <s-load-more
            :style="{ visibility: listData.length === 0 ? 'hidden' : 'visible' }"
            :status="status"
            @load="onLoad"
          />
        </template>
      </s-select-input>
    </s-list-item>
    <s-list-item arrow hover @click="visible = true">
      <template #title>
        {{ value ? JSON.stringify(value) : '选择产线' }}
      </template>
    </s-list-item>
    <s-list-item title="设置为：1110（机加工一线）" arrow hover @click="value = '1110'" />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef, watch } from 'vue'
import { getLines } from '@/api'
import { debounce, LoadMoreStatus } from 'sard'

const visible = ref(false)
const value = ref<string>()

const mapLabel = {
  '1110': '机加工一线',
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

const selectPopoutRef = useTemplateRef('selectInput')

const filterValue = ref('机加工')

const status = ref<LoadMoreStatus>(LoadMoreStatus.INCOMPLETE)

let page = 1

const getData = async (query: string) => {
  status.value = LoadMoreStatus.LOADING
  console.log(page, query)
  return getLines({ page, name: query })
    .then(({ list, total }) => {
      console.log(list, total)
      listData.value = page === 1 ? list : [...listData.value, ...list]

      if (listData.value.length >= total || list.length === 0) {
        status.value = LoadMoreStatus.COMPLETE
      } else {
        status.value = LoadMoreStatus.INCOMPLETE
        page++
      }

      nextTick(() => {
        if (page === 1) {
          selectPopoutRef.value?.scrollTop()
        }
      })
    })
    .catch(() => {
      status.value = LoadMoreStatus.ERROR
    })
}

const debouncedGetData = debounce(() => {
  page = 1
  getData(filterValue.value)
}, 500)

watch(filterValue, () => {
  debouncedGetData()
})

const onLoad = () => {
  getData(filterValue.value)
}
</script>
