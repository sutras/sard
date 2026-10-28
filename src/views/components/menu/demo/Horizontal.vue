<template>
  <!-- 演示大屏顶部横向模块切换：与移动端竖向菜单共享同一套模块命名 -->
  <s-menu direction="horizontal" aria-label="大屏顶部模块切换" @select="onSelect">
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
