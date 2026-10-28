<template>
  <!-- 工业语境：报警通道选中态用危险色，其余入口保持主色，避免全站泛红 -->
  <s-tabbar v-model="value" active-color="var(--s-color-danger)" aria-label="移动巡检端主导航">
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
