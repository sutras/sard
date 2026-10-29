<template>
  <s-popup v-model:visible="visible" :effect="effect">
    <div class="content">
      <s-button block @click="onClick">跳转</s-button>
    </div>
  </s-popup>

  <s-list card>
    <s-list-item hover arrow title="顶部划出" @click="show('slide-top')" />
    <s-list-item hover arrow title="右边划出" @click="show('slide-right')" />
    <s-list-item hover arrow title="底部划出" @click="show('slide-bottom')" />
    <s-list-item hover arrow title="左边划出" @click="show('slide-left')" />
    <s-list-item hover arrow title="缩放" @click="show('zoom')" />
    <s-list-item hover arrow title="淡入淡出" @click="show('fade')" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { type PopupProps } from 'sard'

const router = useRouter()

const visible = ref(false)
const effect = ref<PopupProps['effect']>('fade')

const show = (e: PopupProps['effect']) => {
  visible.value = true
  effect.value = e
}

const onClick = () => {
  router.push(`/components/form`)
}
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 60px;
  background-color: var(--s-bg-color-elevated);
}
</style>
