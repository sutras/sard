<template>
  <div>当前 anchor: {{ current }}</div>

  <s-button style="margin: 5px 0" @click="current = '120000'">设置当前 anchor 为: 120000</s-button>

  <s-scroll-spy v-model="current" style="height: 200px; border: 1px solid var(--s-border-color)">
    <template v-for="item in listData" :key="item.code">
      <s-scroll-spy-anchor :name="item.code" />
      <div class="sticky top-0 p-1 bg-(--s-bg-color-container)">{{ item.code }}</div>
      <div class="flex justify-center items-center h-48 m-2 bg-(--s-fill-color-secondary)">
        {{ item.name }}
      </div>
    </template>
  </s-scroll-spy>
</template>

<script setup lang="ts">
import { getProvinces } from '@/api'
import { onMounted, ref } from 'vue'

const current = ref('110000')

const listData = ref<{ code: string; name: string }[]>([])

onMounted(async () => {
  listData.value = (await getProvinces()).list
})
</script>
