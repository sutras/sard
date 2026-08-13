<template>
  <s-card title="Card title" hover @click="onClick">
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </s-card>
</template>

<script setup lang="ts">
const onClick = () => {
  console.log('click')
}
</script>
