<template>
  <!-- 演示带图标的模块菜单：图标映射业务域，扫码/标定类高频入口放在末位避免误触 -->
  <s-menu theme="dark" aria-label="带图标的工业模块菜单" @select="onSelect">
    <s-menu-item :value="1" label="扫描设备铭牌" #icon>
      <demo-icon name="scan" />
    </s-menu-item>
    <s-menu-item :value="2" label="拍摄报警现场" #icon>
      <demo-icon name="camera" />
    </s-menu-item>
    <s-menu-item :value="3" label="报警中心" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(`触发：${props.label}`)
}
</script>
