<template>
  <doc-page title="Layout 布局">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="列偏移">
      <Offset />
    </doc-demo>

    <doc-demo title="水平对齐">
      <Justify />
    </doc-demo>

    <doc-demo title="垂直对齐">
      <Align />
    </doc-demo>

    <doc-demo title="列间距">
      <Gap />
    </doc-demo>

    <doc-demo title="列顺序">
      <Order />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Offset from './demo/Offset.vue'
import Justify from './demo/Justify.vue'
import Align from './demo/Align.vue'
import Gap from './demo/Gap.vue'
import Order from './demo/Order.vue'
</script>

<style lang="scss" scoped>
:deep() {
  .s-row {
    margin-bottom: 10px;
  }
  .s-col {
    border: 1px dashed oklch(64.6% 0.222 41.116);
  }
  .layout-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: var(--s-border-radius-full);
    color: var(--s-white);
    background-color: var(--s-color-primary);
  }
}
</style>
