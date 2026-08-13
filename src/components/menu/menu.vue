<template>
  <s-list v-for="group in menu" card :key="group.title" :title="group.title">
    <s-list-item
      v-for="comp in group.children"
      :key="comp.title"
      :title="comp.title"
      hover
      arrow
      @click="navigateTo(comp.name)"
    ></s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import menu from './menu.json'

const router = useRouter()

const navigateTo = (name: string) => {
  router.push(`/components/${name}`)
}
</script>

<style lang="scss"></style>
