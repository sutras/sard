<template>
  <s-list card>
    <s-list-item>
      <s-segmented v-model="visible" :options="options" />
    </s-list-item>

    <s-list-item style="padding: 1px 0 0 0">
      <s-swipe-action v-model:visible="visible" :outside-closable="false">
        <s-list-item title="两边插槽" value="内容" />
        <template #left="{ hide }">
          <s-button color="danger" square auto-height @click="onClick('点赞', hide)">点赞</s-button>
          <s-button color="primary" square auto-height @click="onClick('分享', hide)">
            分享
          </s-button>
          <s-button color="warning" square auto-height @click="onClick('收藏', hide)">
            收藏
          </s-button>
        </template>
        <template #right="{ hide }">
          <s-button color="danger" square auto-height @click="onClick('删除', hide)">删除</s-button>
          <s-button color="primary" square auto-height @click="onClick('取消', hide)">
            取消
          </s-button>
        </template>
      </s-swipe-action>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { type SwipeActionVisible, toast } from 'sard'
import { ref } from 'vue'

const visible = ref<SwipeActionVisible>(false)

const options = [
  { label: 'left', value: 'left' },
  { label: 'false', value: false },
  { label: 'right', value: 'right' },
]

const onClick = (content: string, hide: () => void) => {
  toast(`点击了${content}`)
  hide()
}
</script>
