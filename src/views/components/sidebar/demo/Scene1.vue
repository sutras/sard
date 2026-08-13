<template>
  <doc-page title="场景1" padding="0">
    <s-scroll-spy v-model="current" :style="{ height: scrollViewHeight }">
      <div style="display: flex">
        <s-sidebar
          v-model="current"
          round
          :style="{
            position: 'sticky',
            top: 0,
            height: scrollViewHeight,
          }"
        >
          <s-sidebar-item v-for="(item, i) in list" :key="i" :name="i" :title="item.title" />

          <div style="height: var(--s-safe-bottom); flex: none"></div>
        </s-sidebar>

        <div style="flex: 1; min-width: 0; margin: 0 10px">
          <div v-for="(item, i) in list" :key="i">
            <s-scroll-spy-anchor
              :name="i"
              :style="{
                position: 'sticky',
                top: 0,
                padding: '5px 0',
                background: 'var(--s-bg-color-container)',
              }"
            >
              {{ item.title }}
            </s-scroll-spy-anchor>
            <div>
              <div
                v-for="(_, i) in item.children"
                :key="i"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100px;
                  margin-bottom: 5px;
                  background: var(--s-fill-color);
                "
              >
                {{ i }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </s-scroll-spy>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollViewHeight = `calc(100vh - var(--s-navbar-height) - var(--s-status-bar-height))`

const list = ref(
  Array(20)
    .fill(0)
    .map((_, i) => {
      return {
        title: '标签' + i,
        children: Array(3).fill(0),
      }
    }),
)

const current = ref(0)
</script>
