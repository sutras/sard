<template>
  <s-popover v-model:visible="visible" :position="position" :reference="reference">
    <s-menu @select="onSelect">
      <s-menu-item :value="1" label="选项1" />
      <s-menu-item :value="2" label="选项2" />
      <s-menu-item :value="3" label="选项3" />
    </s-menu>
  </s-popover>

  <s-list card>
    <s-list-item arrow hover title="屏幕中下" @click="onBottomCenter" />
    <s-list-item arrow hover title="屏幕右下" @click="onBottomEnd" />
    <s-list-item arrow hover title="屏幕中上" @click="onTopCenter" />
  </s-list>
</template>

<script setup lang="ts">
import { toast, type MenuItemProps, type PopoverPosition, type PopperTarget } from 'sard'
import { ref } from 'vue'

const visible = ref(false)

const position = ref<PopoverPosition>('bottom')

let domRect = new DOMRect()

const reference = ref<PopperTarget>({
  getBoundingClientRect() {
    return domRect
  },
})

const onSelect = (props: MenuItemProps) => {
  visible.value = false
  toast(props.label!)
}

const onShow = (event: MouseEvent, pos: PopoverPosition, rect: DOMRect) => {
  event.stopPropagation()
  position.value = pos
  domRect = rect
  visible.value = true
}

const onBottomCenter = (event: MouseEvent) => {
  onShow(event, 'bottom', new DOMRect(0, window.innerHeight - 10, window.innerWidth, 10))
}

const onBottomEnd = (event: MouseEvent) => {
  onShow(event, 'bottom-end', new DOMRect(window.innerWidth - 40, window.innerHeight - 10, 10, 10))
}

const onTopCenter = (event: MouseEvent) => {
  onShow(event, 'top', new DOMRect(0, 0, window.innerWidth, 10))
}
</script>
