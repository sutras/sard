<template>
  <doc-page gray title="Dropdown 下拉菜单">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="占位符" full>
      <Placeholder />
    </doc-demo>

    <doc-demo title="添加 label" full>
      <Label />
    </doc-demo>

    <doc-demo title="向上展开" full>
      <Direction />
    </doc-demo>

    <doc-demo title="禁用" full>
      <Disabled />
    </doc-demo>

    <doc-demo title="自定义内容" full>
      <Content />
    </doc-demo>

    <doc-demo title="异步开关" full>
      <Async />
    </doc-demo>

    <doc-demo title="可取消选择" full>
      <Togglable />
    </doc-demo>

    <doc-demo title="分隔线" full>
      <Separator />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Placeholder from './demo/Placeholder.vue'
import Label from './demo/Label.vue'
import Direction from './demo/Direction.vue'
import Disabled from './demo/Disabled.vue'
import Content from './demo/Content.vue'
import Async from './demo/Async.vue'
import Togglable from './demo/Togglable.vue'
import Separator from './demo/Separator.vue'
</script>
