<template>
  <doc-page title="Skeleton 骨架屏">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>

    <doc-demo title="显示标题">
      <Title />
    </doc-demo>

    <doc-demo title="显示头像">
      <Avatar />
    </doc-demo>

    <doc-demo title="圆形头像">
      <RoundAvatar />
    </doc-demo>

    <doc-demo title="圆角标题和段落">
      <RoundTitle />
    </doc-demo>

    <doc-demo title="动画效果">
      <Animated />
    </doc-demo>

    <doc-demo title="包含子组件">
      <Contain />
    </doc-demo>

    <doc-demo title="自定义">
      <Custom />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Title from './demo/Title.vue'
import Avatar from './demo/Avatar.vue'
import RoundAvatar from './demo/RoundAvatar.vue'
import RoundTitle from './demo/RoundTitle.vue'
import Animated from './demo/Animated.vue'
import Contain from './demo/Contain.vue'
import Custom from './demo/Custom.vue'
</script>
