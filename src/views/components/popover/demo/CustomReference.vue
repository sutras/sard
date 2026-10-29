<template>
  <s-popover v-model:visible="visible" position="right" :reference="referenceRef">
    <s-menu @select="onSelect">
      <s-menu-item :value="1" label="早班" />
      <s-menu-item :value="2" label="中班" />
      <s-menu-item :value="3" label="晚班" />
    </s-menu>
  </s-popover>

  <div
    ref="reference"
    class="flex justify-center items-center size-25 bg-(--s-color-warning)"
    @click="visible = true"
  >
    box
  </div>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps } from 'sard'
import { ref, useTemplateRef } from 'vue'

const visible = ref(false)

const onSelect = (props: MenuItemProps) => {
  visible.value = false
  toast(props.label!)
}

const referenceRef = useTemplateRef('reference')
</script>
