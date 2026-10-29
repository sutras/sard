<template>
  <s-list card>
    <s-list-item title="上一步" @click="prevStep" arrow hover />
    <s-list-item title="下一步" @click="nextStep" arrow hover />
    <s-list-item>
      <s-steps :current="current" direction="vertical">
        <s-step v-for="(item, i) in itemList" :key="i" :index="i">
          <div style="display: flex; align-items: center">
            <div>
              <div>{{ item.name }}</div>
              <div style="color: var(--s-text-color-tertiary); font-size: var(--s-font-size-sm)">
                {{ item.description }}
              </div>
            </div>
            <s-button style="margin-inline-start: auto" variant="link">操作</s-button>
          </div>
        </s-step>
      </s-steps>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(8)

const itemList = [
  { name: '下发工单', description: '需班组长授权' },
  { name: '班组长授权', description: '需班组长授权' },
  { name: '设备启动', description: '需班组长授权' },
]

const prevStep = () => {
  current.value = current.value <= 0 ? itemList.length : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= itemList.length ? 0 : current.value + 1
}
</script>
