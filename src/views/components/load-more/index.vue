<template>
  <doc-page gray title="LoadMore 加载更多">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="配合 useLoadMore 钩子函数使用">
      <Hook />
    </doc-demo>

    <doc-demo title="配合 PullDownRefresh 组件使用">
      <WithRefresh />
    </doc-demo>

    <doc-demo title="页面触底加载" full>
      <s-list>
        <s-list-item title="页面触底加载" arrow hover @click="navigateTo('FullPage')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Basic from './demo/Basic.vue'
import Hook from './demo/Hook.vue'
import WithRefresh from './demo/WithRefresh.vue'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/load-more/demo/${url}`)
}
</script>
