<template>
  <s-list card>
    <s-list-item style="padding: 1px 0 0 0">
      <s-swipe-action disabled>
        <s-list-item title="两边插槽" value="内容" />
        <template #right>
          <s-button color="danger" square auto-height @click="onClick('删除')">删除</s-button>
          <s-button color="primary" square auto-height @click="onClick('取消')">取消</s-button>
        </template>
      </s-swipe-action>
    </s-list-item>

    <s-list-item style="padding: 1px 0 0 0">
      <s-swipe-action disabled visible="right" :outside-closable="false">
        <s-list-item title="两边插槽" value="内容" />
        <template #right>
          <s-button color="danger" square auto-height @click="onClick('删除')">删除</s-button>
          <s-button color="primary" square auto-height @click="onClick('取消')">取消</s-button>
        </template>
      </s-swipe-action>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { toast } from 'sard'

const onClick = (content: string) => {
  toast(`点击了${content}`)
}
</script>
