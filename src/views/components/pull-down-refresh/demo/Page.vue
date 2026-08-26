<template>
  <doc-page title="基于页面的刷新">
    <s-pull-down-refresh :loading="loading" @refresh="onRefresh">
      <div
        v-for="item in 5"
        :key="item"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 16px 5px;
          height: 40px;
          border: 1px solid var(--s-border-color);
          border-radius: var(--s-border-radius);
        "
      >
        {{ item }}
      </div>
    </s-pull-down-refresh>
  </doc-page>
</template>

<script setup lang="ts">
import { toast } from 'sard'
import { ref } from 'vue'

const loading = ref(false)

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
