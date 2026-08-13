<template>
  <s-button @click="visible = true">显示分享面板</s-button>

  <s-share-sheet v-model:visible="visible" show-cancel @select="onSelect">
    <s-share-sheet-row>
      <s-share-sheet-item value="Sard" label="Sard" #icon>
        <s-share-sheet-icon url="https://fastly.jsdelivr.net/npm/@sard/assets/pic1.jpg" />
      </s-share-sheet-item>
      <s-share-sheet-item value="Wechat" label="Wechat" #icon>
        <s-share-sheet-icon background="#0bc15f" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
    </s-share-sheet-row>
  </s-share-sheet>
</template>

<script setup lang="ts">
import { toast, type ShareSheetItemProps } from 'sard'
import { ref } from 'vue'

const visible = ref(false)

const onSelect = (item: ShareSheetItemProps) => {
  toast(item.label)
}
</script>
