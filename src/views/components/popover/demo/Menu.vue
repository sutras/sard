<template>
  <s-popover v-model:visible="visible">
    <template #reference>
      <s-button>显示气泡弹出框</s-button>
    </template>
    <s-menu @select="onSelect">
      <s-menu-item :value="1" label="选项1" />
      <s-menu-item :value="2" label="选项2" />
      <s-menu-item :value="3" label="选项3" />
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
