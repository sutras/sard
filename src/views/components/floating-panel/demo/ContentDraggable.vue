<template>
  <doc-page gray title="仅头部拖拽">
    <s-floating-panel :content-draggable="false">
      <div style="padding: 10px; text-align: center">内容不可拖拽</div>
      <s-list>
        <s-list-item v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)"></s-list-item>
      </s-list>
    </s-floating-panel>
  </doc-page>
</template>

<script setup lang="ts"></script>
