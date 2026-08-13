<template>
  <doc-page gray title="Steps 步骤条">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="居中">
      <Center />
    </doc-demo>

    <doc-demo title="文字在上">
      <Reverse />
    </doc-demo>

    <doc-demo title="垂直步骤条">
      <Vertical />
    </doc-demo>

    <doc-demo title="垂直居中">
      <VerticalCenter />
    </doc-demo>

    <doc-demo title="自定义图标">
      <Icon />
    </doc-demo>

    <doc-demo title="自定义颜色">
      <Color />
    </doc-demo>

    <doc-demo title="当前步骤状态">
      <Status />
    </doc-demo>

    <doc-demo title="错误步骤">
      <ErrorStatus />
    </doc-demo>

    <doc-demo title="自定义各步骤状态">
      <StepStatus />
    </doc-demo>

    <doc-demo title="默认插槽">
      <Slot />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Center from './demo/Center.vue'
import Reverse from './demo/Reverse.vue'
import Vertical from './demo/Vertical.vue'
import VerticalCenter from './demo/VerticalCenter.vue'
import Icon from './demo/Icon.vue'
import Color from './demo/Color.vue'
import Status from './demo/Status.vue'
import ErrorStatus from './demo/ErrorStatus.vue'
import StepStatus from './demo/StepStatus.vue'
import Slot from './demo/Slot.vue'
</script>
