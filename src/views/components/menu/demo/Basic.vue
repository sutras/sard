<template>
  <s-menu @select="onSelect">
    <s-menu-item :value="1" label="设备监控" />
    <s-menu-item :value="2" label="生产工单" />
    <s-menu-item :value="3" label="质量管理" />
    <s-menu-item :value="4" label="能源管理" />
    <s-menu-item :value="5" label="维护保养" />
    <s-menu-item :value="6" label="报警中心" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(`进入模块：${props.label}`)
}
</script>
