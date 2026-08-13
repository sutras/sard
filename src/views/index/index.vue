<template>
  <div :class="bem.b()">
    <div :class="bem.e('header')">
      <div :class="bem.e('leading')">
        <img :class="bem.e('logo')" :src="logo" />
        <span :class="bem.e('title')">{{ title }}</span>
      </div>
      <div :class="bem.e('desc')">
        {{ desc }}
      </div>
    </div>

    <div :class="bem.e('menu')">
      <Menu></Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createBem } from '@/utils'
import { ref } from 'vue'
import Menu from '@/components/menu/menu.vue'
import logo from '@/assets/logo.svg'

const bem = createBem('index')

const title = ref('Sard')
const desc = ref('Vue3 UI 组件库')
</script>

<style lang="scss">
@use '@/style/base.scss' as *;

@include b(index) {
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: var(--s-bg-color-layout);
  }

  @include e(header) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: calc(50px + var(--s-status-bar-height)) 32px 10px;
  }

  @include e(leading) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  @include e(logo) {
    width: 32px;
    height: 32px;
  }

  @include e(title) {
    font-size: 22px;
    font-weight: bold;
  }

  @include e(desc) {
    font-size: 14px;
    color: var(--s-text-color-tertiary);
  }

  @include e(menu) {
    margin-inline-start: 16px;
    margin-inline-end: 16px;
    padding-bottom: 30px;
  }
}
</style>
