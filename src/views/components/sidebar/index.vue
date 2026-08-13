<template>
  <doc-page title="Sidebar 侧边导航">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="圆角" full>
      <Round />
    </doc-demo>

    <doc-demo title="线条" full>
      <Line />
    </doc-demo>

    <doc-demo title="禁用" full>
      <Disabled />
    </doc-demo>

    <doc-demo title="自定义" full>
      <Custom />
    </doc-demo>

    <doc-demo title="场景应用" full>
      <s-list>
        <s-list-item title="场景1" arrow hover @click="navigateTo('Scene1')" />
        <s-list-item title="场景2" arrow hover @click="navigateTo('Scene2')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Basic from './demo/Basic.vue'
import Round from './demo/Round.vue'
import Line from './demo/Line.vue'
import Disabled from './demo/Disabled.vue'
import Custom from './demo/Custom.vue'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/sidebar/demo/${url}`)
}
</script>
