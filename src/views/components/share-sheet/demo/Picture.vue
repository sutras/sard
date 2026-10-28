<template>
  <!-- 工业语境：报警处置单分享给维修班｜Picture 用法演示 -->
  <s-button @click="visible = true">转派处置单</s-button>

  <s-share-sheet v-model:visible="visible" show-cancel @select="onSelect">
    <s-share-sheet-row>
      <s-share-sheet-item value="archive" label="设备档案" #icon>
        <s-share-sheet-icon :url="inspectionPhoto" />
      </s-share-sheet-item>
      <s-share-sheet-item value="wecom" label="企业微信" #icon>
        <s-share-sheet-icon background="#2f855a" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
    </s-share-sheet-row>
  </s-share-sheet>
</template>

<script setup lang="ts">
import { inspectionPhoto } from '@/data/industrial-images'
import { toast, type ShareSheetItemProps } from 'sard'
import { ref } from 'vue'

const visible = ref(false)

const onSelect = (item: ShareSheetItemProps) => {
  toast(item.label)
}
</script>
