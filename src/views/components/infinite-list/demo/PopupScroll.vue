<template>
  <s-button @click="visible = true">显示弹窗</s-button>

  <s-popup v-model:visible="visible" effect="slide-bottom">
    <div class="content">
      <div class="flex justify-center items-center p-7 bg-(--s-fill-color)">header</div>
      <s-infinite-list :request="request" refreshable>
        <s-list inlaid>
          <s-list-item v-for="item in listData" :key="item.code" :title="item.name" />
        </s-list>
      </s-infinite-list>
    </div>
  </s-popup>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { ref } from 'vue'

const visible = ref(false)

const listData = ref<{ code: string; name: string }[]>([])

const request = async (page: number, isRefresh: boolean) => {
  return getProvinces({ page }).then(({ list, total }) => {
    if (isRefresh) {
      listData.value = [...list]
    } else {
      listData.value = [...listData.value, ...list]
    }
    return listData.value.length >= total || list.length === 0
  })
}
</script>

<style scoped>
.content {
  height: 60vh;
  padding: 16px;
  overflow-y: auto;
  background: var(--s-bg-color-elevated);
}
</style>
