<template>
  <doc-page gray title="Search 搜索">
    <doc-demo title="基础使用" full>
      <Basic />
    </doc-demo>

    <doc-demo title="搜索按钮" full>
      <SearchButton />
    </doc-demo>

    <doc-demo title="取消按钮" full>
      <CancelButton />
    </doc-demo>

    <doc-demo title="形状" full>
      <Shape />
    </doc-demo>

    <doc-demo title="对齐" full>
      <Align />
    </doc-demo>

    <doc-demo title="背景色" full>
      <Background />
    </doc-demo>

    <doc-demo title="只读和禁用" full>
      <DisabledReadOnly />
    </doc-demo>

    <doc-demo title="插槽" full>
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import SearchButton from './demo/SearchButton.vue'
import CancelButton from './demo/CancelButton.vue'
import Shape from './demo/Shape.vue'
import Align from './demo/Align.vue'
import Background from './demo/Background.vue'
import DisabledReadOnly from './demo/DisabledReadOnly.vue'
import Slot from './demo/Slot.vue'
</script>
