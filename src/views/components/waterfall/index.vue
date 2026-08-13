<template>
  <doc-page gray title="Waterfall 瀑布流">
    <doc-demo>
      <s-list card>
        <s-list-item title="基础使用" arrow hover @click="navigateTo('Basic')" />
        <s-list-item title="已知宽高" arrow hover @click="navigateTo('KnownSize')" />
        <s-list-item title="真实案例" arrow hover @click="navigateTo('TrueCase')" />
        <s-list-item title="最大等待时间" arrow hover @click="navigateTo('MaxWait')" />
        <s-list-item title="大图" arrow hover @click="navigateTo('BigImage')" />
        <s-list-item title="自定义列数" arrow hover @click="navigateTo('Columns')" />
        <s-list-item title="结合下拉刷新与触底加载" arrow hover @click="navigateTo('Dynamic')" />
      </s-list>
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/waterfall/demo/${url}`)
}
</script>
