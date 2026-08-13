<template>
  <doc-page gray title="CheckboxPopout 复选弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="全选">
      <CheckAll />
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
import CheckAll from './demo/CheckAll.vue'
import Disabled from './demo/Disabled.vue'
import Search from './demo/Search.vue'
</script>
