<template>
  <s-list card>
    <s-list-item>
      <div class="h-25">
        <s-motion :name="name">
          <div v-show="visible" class="size-25 bg-fuchsia-600 mx-auto"></div>
        </s-motion>
      </div>
    </s-list-item>
    <s-list-item
      v-for="name in names"
      :key="name"
      :title="name"
      arrow
      hover
      @click="onClick(name)"
    />
  </s-list>
</template>

<script setup lang="ts">
import type { MotionName } from 'sard'
import { ref } from 'vue'

const visible = ref(true)

const name = ref<MotionName>('fade')

const names: MotionName[] = [
  'fade',
  'zoom',
  'wide-zoom',
  'slide-top',
  'slide-right',
  'slide-bottom',
  'slide-left',
]

const onClick = (_name: MotionName) => {
  name.value = _name
  visible.value = !visible.value
}
</script>
