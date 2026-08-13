<template>
  <doc-page gray title="Indexes 索引">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="全屏" full>
      <s-list>
        <s-list-item title="选择区号" arrow hover @click="navigateTo('FullPage')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Basic from './demo/Basic.vue'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/indexes/demo/${url}`)
}
</script>
