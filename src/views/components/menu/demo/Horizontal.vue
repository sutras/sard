<template>
  <s-menu direction="horizontal" @select="onSelect">
    <s-menu-item :value="1" label="设备监控" #icon>
      <demo-icon name="signal" />
    </s-menu-item>
    <s-menu-item :value="2" label="生产工单" #icon>
      <demo-icon name="work-order" />
    </s-menu-item>
    <s-menu-item :value="3" label="报警中心" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(`切换到：${props.label}`)
}
</script>
