<template>
  <s-tabbar v-model="value">
    <s-tabbar-item :value="0" label="设备" #icon>
      <demo-icon name="cnc" />
    </s-tabbar-item>
    <s-tabbar-item :value="1" label="工单" #icon>
      <demo-icon name="work-order" />
    </s-tabbar-item>
    <s-tabbar-item :value="2" label="报警" #icon>
      <s-badge :value="5">
        <demo-icon name="alarm" />
      </s-badge>
    </s-tabbar-item>
    <s-tabbar-item :value="3" label="我的" #icon>
      <s-badge dot>
        <demo-icon name="user" />
      </s-badge>
    </s-tabbar-item>
  </s-tabbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>
