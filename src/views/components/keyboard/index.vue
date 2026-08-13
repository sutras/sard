<template>
  <doc-page gray title="Keyboard 键盘">
    <doc-demo title="数字键盘" full>
      <Number />
    </doc-demo>

    <doc-demo title="带小数点的数字键盘" full>
      <Digit />
    </doc-demo>

    <doc-demo title="身份证键盘" full>
      <Idcard />
    </doc-demo>

    <doc-demo title="随机数字键盘" full>
      <Random />
    </doc-demo>

    <doc-demo title="车牌号键盘" full>
      <Plate />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Number from './demo/Number.vue'
import Digit from './demo/Digit.vue'
import Idcard from './demo/Idcard.vue'
import Random from './demo/Random.vue'
import Plate from './demo/Plate.vue'
</script>
