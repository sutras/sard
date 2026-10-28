<template>
  <!-- 演示车间大屏暗色菜单：大屏常亮环境下降低整体亮度，模块名保持与移动端一致 -->
  <s-menu theme="dark" aria-label="大屏暗色模块菜单" @select="onSelect">
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
