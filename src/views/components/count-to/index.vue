<template>
  <doc-page title="CountTo 数字滚动">
    <doc-demo title="基础使用">
      <Basic />
    </doc-demo>
    <doc-demo title="小数位数">
      <Precision />
    </doc-demo>
    <doc-demo title="分隔符">
      <Separator />
    </doc-demo>
    <doc-demo title="持续时间">
      <Duration />
    </doc-demo>
    <doc-demo title="随机数字">
      <Random />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Basic from './demo/Basic.vue'
import Precision from './demo/Precision.vue'
import Separator from './demo/Separator.vue'
import Duration from './demo/Duration.vue'
import Random from './demo/Random.vue'
</script>
