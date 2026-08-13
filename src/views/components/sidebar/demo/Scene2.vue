<template>
  <doc-page padding="0" title="场景2">
    <s-scroll-spy v-model="current" :style="{ height: scrollViewHeight }" :offset="44">
      <div
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          height: 150px;
          margin: 10px;
          font-size: 32px;
          background: var(--s-fill-color);
        "
      >
        Banner
      </div>

      <div style="position: sticky; top: 0; z-index: 10; background: var(--s-bg-color-container)">
        <s-tabs :model-value="1" scrollable :options="tabsOptions"></s-tabs>
      </div>

      <div style="display: flex">
        <s-sidebar
          v-model="current"
          round
          :style="{
            position: 'sticky',
            top: stickyTop,
            height: `calc(${scrollViewHeight} - ${stickyTop})`,
          }"
          :scroll-into-view-options="{ endOffset: 80 }"
        >
          <s-sidebar-item v-for="(item, i) in list" :key="i" :name="i" :title="item.title" />
          <div style="height: 80px; flex: none"></div>
        </s-sidebar>

        <div style="flex: 1; min-width: 0; margin: 0 10px">
          <div v-for="(item, i) in list" :key="i">
            <s-scroll-spy-anchor
              :name="i"
              :style="{
                position: 'sticky',
                top: stickyTop,
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

          <div style="height: 80px"></div>
        </div>
      </div>
    </s-scroll-spy>

    <div
      style="
        position: fixed;
        bottom: 15px;
        left: 15px;
        right: 15px;
        z-index: 10;
        height: 50px;
        border-radius: 6px;
        background: var(--s-bg-color-container);
        box-shadow: var(--s-box-shadow-secondary);
      "
    ></div>
  </doc-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scrollViewHeight = `calc(100vh - var(--s-navbar-height) - var(--s-status-bar-height))`
const stickyTop = `var(--s-tabs-tab-height)`

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
const tabsOptions = [
  { label: '标签1', value: 1 },
  { label: '标签2', value: 2 },
  { label: '标签3', value: 3 },
]
</script>
