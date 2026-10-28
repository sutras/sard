<template>
  <!-- 工业语境：报警处置单分享给维修班｜MultipleRow 用法演示 -->
  <s-button @click="visible = true">转派处置单</s-button>

  <s-share-sheet v-model:visible="visible" @select="onSelect">
    <s-share-sheet-row>
      <s-share-sheet-item value="wecom" label="企业微信" #icon>
        <s-share-sheet-icon background="#0bc15f" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="sms" label="短信通知" #icon>
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

    <s-share-sheet-row>
      <s-share-sheet-item value="spare" label="备件申领" #icon>
        <s-share-sheet-icon background="#b7791f" color="#fff">
          <demo-icon name="warehouse" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="print" label="打印凭证" #icon>
        <s-share-sheet-icon background="#4a5568" color="#fff">
          <demo-icon name="scan" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="quality" label="质量群" #icon>
        <s-share-sheet-icon background="#2f855a" color="#fff">
          <demo-icon name="work-order" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="mes" label="MES 归档" #icon>
        <s-share-sheet-icon background="#1a365d" color="#fff">
          <demo-icon name="warehouse" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="call" label="电话通知" #icon>
        <s-share-sheet-icon background="#4a5568" color="#fff">
          <demo-icon name="phone" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="sop" label="工艺规程" #icon>
        <s-share-sheet-icon background="#553c9a" color="#fff">
          <demo-icon name="list" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="supervisor" label="上报主管" #icon>
        <s-share-sheet-icon background="#fffc00" color="#000">
          <demo-icon name="user" />
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
