<template>
  <doc-page gray title="基础用法">
    <s-floating-panel>
      <s-list>
        <s-list-item v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)"></s-list-item>
      </s-list>
    </s-floating-panel>
  </doc-page>
</template>

<script setup lang="ts"></script>
