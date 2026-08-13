<template>
  <doc-page title="自定义插槽" padding="10px">
    <div
      ref="scroll"
      class="overflow-y-auto"
      style="height: 300px; margin: 10px 0; border: 1px solid var(--s-border-color)"
      @scroll="onScroll"
    >
      <s-pull-down-refresh
        ref="pullDownRefresh"
        :loading="loading"
        :done-duration="500"
        @refresh="onRefresh"
      >
        <template #unready="{ progress }">
          <s-loading size="24px" :animated="false" :progress="progress">
            <template #circular>
              <demo-icon name="arrow-clockwise" />
            </template>
            下拉刷新
          </s-loading>
        </template>
        <template #ready>
          <s-loading size="24px" :animated="false">
            <template #circular>
              <demo-icon name="arrow-clockwise" />
            </template>
            释放刷新
          </s-loading>
        </template>
        <template #loading>
          <s-loading size="24px">
            <template #circular>
              <demo-icon name="arrow-clockwise" />
            </template>
            加载中...
          </s-loading>
        </template>
        <template #done>{{ doneText }}</template>
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

const doneText = ref('')

const onRefresh = () => {
  loading.value = true
  fetchApi()
    .then(() => {
      doneText.value = '刷新成功'
    })
    .catch(() => {
      doneText.value = '刷新失败'
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
