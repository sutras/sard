<template>
  <s-menu theme="dark" @select="onSelect">
    <s-menu-item :value="1" label="选项1" #icon>
      <demo-icon name="upc-scan" />
    </s-menu-item>
    <s-menu-item :value="2" label="选项2" #icon>
      <demo-icon name="camera" />
    </s-menu-item>
    <s-menu-item :value="3" label="选项3" />
  </s-menu>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'

const onSelect = (props: MenuItemProps) => {
  toast(props.label!)
}
</script>
