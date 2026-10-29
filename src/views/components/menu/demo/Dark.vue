<template>
  <s-menu theme="dark" @select="onSelect">
    <s-menu-item :value="1" label="设备监控" />
    <s-menu-item :value="2" label="生产工单" />
    <s-menu-item :value="3" label="报警中心" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(`进入模块：${props.label}`)
}
</script>
