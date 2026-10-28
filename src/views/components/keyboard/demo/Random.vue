<template>
  <!-- 工业语境：工艺参数数字键盘｜Random 用法演示 -->
  <s-list>
    <s-list-item>
      <s-keyboard ref="keyboard" type="random" />
    </s-list-item>
    <s-list-item title="打乱" arrow hover @click="keyboardRef?.shuffle()" />
  </s-list>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue'

const keyboardRef = useTemplateRef('keyboard')
</script>
