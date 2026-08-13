<template>
  <doc-page gray title="RadioPopout 单选弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="禁用选项">
      <Disabled />
    </doc-demo>

    <doc-demo title="可搜索的">
      <Search />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Disabled from './demo/Disabled.vue'
import Search from './demo/Search.vue'
</script>
