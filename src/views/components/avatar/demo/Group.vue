<template>
  <!-- 工业语境：当班人员与责任班组头像，编号与工号一一对应｜Group 用法演示 -->
  <s-avatar-group :total="avatarList.length" :max="max">
    <s-avatar v-for="(item, index) in avatarList.slice(0, max)" :key="index" :index="index">
      {{ item.text }}
    </s-avatar>
  </s-avatar-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const avatarList = ref(
  Array(10)
    .fill(0)
    .map((_, i) => ({ text: i + 1 })),
)
const max = 5
</script>
