<template>
  <doc-page title="CoolIcon 酷炫图标">
    <doc-demo title="椭圆">
      <Oval />
    </doc-demo>

    <doc-demo title="圆形">
      <Circle />
    </doc-demo>

    <doc-demo title="方形">
      <Square />
    </doc-demo>

    <doc-demo title="三角形">
      <Triangle />
    </doc-demo>

    <doc-demo title="花朵">
      <Flower />
    </doc-demo>

    <doc-demo title="尺寸">
      <Size />
    </doc-demo>
  </doc-page>
</template>

<script setup lang="ts">
import Oval from './demo/Oval.vue'
import Circle from './demo/Circle.vue'
import Square from './demo/Square.vue'
import Triangle from './demo/Triangle.vue'
import Flower from './demo/Flower.vue'
import Size from './demo/Size.vue'
</script>
