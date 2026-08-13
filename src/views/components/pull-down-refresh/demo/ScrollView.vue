<template>
  <doc-page title="基于 scroll-view 的刷新" padding="10px">
    <s-button block @click="loading = !loading">toggle loading</s-button>
    <div
      ref="scroll"
      class="overflow-y-auto"
      style="height: 300px; margin: 10px 0; border: 1px solid var(--s-border-color)"
      @scroll="onScroll"
    >
      <s-pull-down-refresh ref="pullDownRefresh" :loading="loading" @refresh="onRefresh">
        <div
          v-for="item in 10"
          :key="item"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 5px 16px;
            height: 40px;
            border: 1px solid var(--s-border-color);
            border-radius: var(--s-border-radius);
          "
        >
          {{ item }}
        </div>
      </s-pull-down-refresh>
    </div>
  </doc-page>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { ref, useTemplateRef } from 'vue'

const loading = ref(false)
const pullDownRefresh = ref()

const scrollRef = useTemplateRef('scroll')

const onScroll = () => {
  pullDownRefresh.value?.enableToRefresh(scrollRef.value!.scrollTop === 0)
}

const fetchApi = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const onRefresh = () => {
  loading.value = true
  fetchApi()
    .then(() => {
      toast('刷新成功')
    })
    .catch(() => {
      toast('刷新失败')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
