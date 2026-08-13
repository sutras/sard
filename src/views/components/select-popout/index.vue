<template>
  <doc-page gray title="SelectPopout 列表选择弹出框">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="选项分组">
      <Group />
    </doc-demo>

    <doc-demo title="多选">
      <Multiple />
    </doc-demo>

    <doc-demo title="显示工具栏">
      <Toolbar />
    </doc-demo>

    <doc-demo title="最多选择个数">
      <MultipleLimit />
    </doc-demo>

    <doc-demo title="禁用选项">
      <Disabled />
    </doc-demo>

    <doc-demo title="自定义选项标签">
      <CustomLabel />
    </doc-demo>

    <doc-demo title="自定义整个选项">
      <CustomOption />
    </doc-demo>

    <doc-demo title="筛选选项">
      <Filterable />
    </doc-demo>

    <doc-demo title="远程">
      <Remote />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Group from './demo/Group.vue'
import Multiple from './demo/Multiple.vue'
import Toolbar from './demo/Toolbar.vue'
import MultipleLimit from './demo/MultipleLimit.vue'
import Disabled from './demo/Disabled.vue'
import CustomLabel from './demo/CustomLabel.vue'
import CustomOption from './demo/CustomOption.vue'
import Filterable from './demo/Filterable.vue'
import Remote from './demo/Remote.vue'
</script>
