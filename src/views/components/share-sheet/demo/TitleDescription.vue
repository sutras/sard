<template>
  <s-button @click="visible = true">转派处置单</s-button>
  <s-share-sheet
    v-model:visible="visible"
    title="转派到"
    description="报警 ALM-20241027-0031 转派给维修一班"
    show-cancel
    @select="onSelect"
  >
    <s-share-sheet-row>
      <s-share-sheet-item value="wecom" label="企业微信" #icon>
        <s-share-sheet-icon background="#0bc15f" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="sms" label="短信通知" description="含现场照片 2 张" #icon>
        <s-share-sheet-icon background="#2b6cb0" color="#fff">
          <demo-icon name="phone" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="workorder" label="维修工单" #icon>
        <s-share-sheet-icon background="#4a5568" color="#fff">
          <demo-icon name="work-order" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="alarmgroup" label="报警群" #icon>
        <s-share-sheet-icon background="#d92b2b" color="#fff">
          <demo-icon name="bell" />
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
