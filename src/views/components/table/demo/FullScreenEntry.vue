<template>
  <s-list>
    <s-list-item title="等级特权" arrow hover @click="navigateTo('FullScreen')" />
  </s-list>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (url: string) => {
  router.push(`/components/table/demo/${url}`)
}
</script>
