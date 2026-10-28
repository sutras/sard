<template>
  <!-- 工业语境：移动巡检端主导航，设备 / 工单 / 报警 / 我的四个入口统一用同一套线性图标 -->
  <s-tabbar v-model="value" aria-label="移动巡检端主导航">
    <s-tabbar-item :value="0" label="设备" #icon>
      <demo-icon name="cnc" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="工单" #icon>
      <demo-icon name="work-order" />
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="报警" #icon>
      <demo-icon name="alarm" />
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <demo-icon name="user" />
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
