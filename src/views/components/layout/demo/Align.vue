<template>
  <div class="layout-align">
    <s-row v-for="item in alignTypes" :align="item">
      <s-col>
        <div class="layout-box">{{ item }}</div>
      </s-col>
      <s-col>
        <div class="layout-box" style="height: 90px">{{ item }}</div>
      </s-col>
    </s-row>
  </div>
</template>

<script setup lang="ts">
const alignTypes = ['start', 'center', 'end', 'stretch'] as const
</script>
