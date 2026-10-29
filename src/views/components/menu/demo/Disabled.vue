<template>
  <s-menu @select="onSelect">
    <s-menu-item :value="1" label="能源管理（需能源管理员）" disabled />
    <s-menu-item :value="2" label="维护保养（停机窗口外不可用）" disabled />
    <s-menu-item :value="3" label="设备监控" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(`进入模块：${props.label}`)
}
</script>
