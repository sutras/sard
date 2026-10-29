<template>
  <s-button @click="visible = true">转派处置单</s-button>

  <s-share-sheet v-model:visible="visible" show-cancel @select="onSelect">
    <s-share-sheet-row>
      <s-share-sheet-item value="wecom" label="企业微信" disabled #icon>
        <s-share-sheet-icon background="#0bc15f" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="sms" label="短信通知" #icon>
        <s-share-sheet-icon background="#2b6cb0" color="#fff">
          <demo-icon name="phone" />
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
