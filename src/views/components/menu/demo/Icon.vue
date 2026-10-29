<template>
  <s-menu theme="dark" @select="onSelect">
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
