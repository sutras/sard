<template>
  <div class="mb-1 text-sm">
    当前锚点：{{ currentName }}
    <span v-if="current">（{{ current }}）</span>
  </div>

  <s-button v-if="target" class="my-3" @click="current = target.code">
    跳到：{{ target.name }}
  </s-button>

  <s-scroll-spy
    v-model="current"
    style="height: 200px; border: 1px solid var(--s-border-color)"
    class="rounded-lg"
  >
    <template v-for="item in listData" :key="item.code">
      <s-scroll-spy-anchor :name="item.code" />
      <div class="sticky top-0 flex items-baseline gap-2 p-1 bg-(--s-bg-color-container)">
        <span>{{ item.name }}</span>
        <span class="text-xs text-(--s-text-color-tertiary)">{{ item.code }}</span>
      </div>
      <div class="flex justify-center items-center h-48 m-2 bg-(--s-fill-color-secondary)">
        {{ item.name }} 概览
      </div>
    </template>
  </s-scroll-spy>
</template>

<script setup lang="ts">
import { getPlants } from '@/api'
import { computed, onMounted, ref } from 'vue'

const current = ref('')

const listData = ref<{ code: string; name: string }[]>([])

const currentName = computed(
  () => listData.value.find((item) => item.code === current.value)?.name ?? '—',
)

const target = computed(() => listData.value[3])

onMounted(async () => {
  listData.value = (await getPlants()).list
  current.value = listData.value[0]?.code ?? ''
})
</script>
