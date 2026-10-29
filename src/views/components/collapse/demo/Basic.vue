<template>
  <s-button @click="visible = !visible" style="margin-bottom: 10px">
    {{ visible ? '折叠' : '展开' }}
  </s-button>

  <s-collapse :visible="visible">
    <div style="padding: 10px; background-color: var(--s-fill-color)">
      <div>collapse</div>
      <div>collapse</div>
      <div>collapse</div>
      <div>collapse</div>
      <div>collapse</div>
      <div>collapse</div>
    </div>
  </s-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>
