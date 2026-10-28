<template>
  <!-- 工业语境：快捷操作气泡（点检 / 派工 / 停机）｜Dark 用法演示 -->
  <s-popover v-model:visible="visible" theme="dark">
    <template #reference>
      <s-button>显示气泡弹出框</s-button>
    </template>
    <s-menu theme="dark" @select="onSelect">
      <s-menu-item :value="1" label="早班" />
      <s-menu-item :value="2" label="中班" />
      <s-menu-item :value="3" label="晚班" />
    </s-menu>
  </s-popover>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'
import { ref } from 'vue'

const visible = ref(false)

const onSelect = (props: MenuItemProps) => {
  visible.value = false
  toast(props.label!)
}
</script>
