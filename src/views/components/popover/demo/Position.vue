<template>
  <div style="margin: 0 60px">
    <s-grid :columns="3" clickable>
      <s-grid-item text="top-start" @click="show($event, 'top-start')" />
      <s-grid-item text="top" @click="show($event, 'top')" />
      <s-grid-item text="top-end" @click="show($event, 'top-end')" />
    </s-grid>
  </div>

  <div style="display: flex; flex-direction: row; justify-content: space-between">
    <s-grid :columns="1" clickable style="width: 60px">
      <s-grid-item text="left-start" @click="show($event, 'left-start')" />
      <s-grid-item text="left" @click="show($event, 'left')" />
      <s-grid-item text="left-end" @click="show($event, 'left-end')" />
    </s-grid>

    <s-popover v-model:visible="visible" :position="position">
      <template #reference>
        <div class="flex justify-center items-center size-16 m-auto bg-(--s-color-warning)">
          box
        </div>
      </template>
      <div class="p-3">
        <div class="font-bold text-lg">标题</div>
        <div class="mt-1">这是内容这是内容</div>
        <div class="mt-1">这是内容这是内容</div>
      </div>
    </s-popover>

    <s-grid :columns="1" clickable style="width: 60px">
      <s-grid-item text="right-start" @click="show($event, 'right-start')" />
      <s-grid-item text="right" @click="show($event, 'right')" />
      <s-grid-item text="right-end" @click="show($event, 'right-end')" />
    </s-grid>
  </div>

  <div style="margin: 0 60px">
    <s-grid :columns="3" clickable>
      <s-grid-item text="bottom-start" @click="show($event, 'bottom-start')" />
      <s-grid-item text="bottom" @click="show($event, 'bottom')" />
      <s-grid-item text="bottom-end" @click="show($event, 'bottom-end')" />
    </s-grid>
  </div>
</template>

<script setup lang="ts">
import { type PopoverPosition } from 'sard'
import { ref } from 'vue'

const position = ref<PopoverPosition>('bottom')
const visible = ref(false)

const show = (event: MouseEvent, pos: PopoverPosition) => {
  event.stopPropagation()
  position.value = pos
  visible.value = true
}
</script>
