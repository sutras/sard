<template>
  <s-button @click="visible = true">显示分享面板</s-button>

  <s-share-sheet v-model:visible="visible" @select="onSelect">
    <s-share-sheet-row>
      <s-share-sheet-item value="Wechat" label="Wechat" #icon>
        <s-share-sheet-icon background="#0bc15f" color="#fff">
          <demo-icon name="wechat-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Alipay" label="Alipay" #icon>
        <s-share-sheet-icon background="#1677ff" color="#fff">
          <demo-icon name="alipay-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Wechat" label="Twitter" #icon>
        <s-share-sheet-icon background="#1d9bf0" color="#fff">
          <demo-icon name="twitter-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Wechat" label="Facebook" #icon>
        <s-share-sheet-icon background="#1877f2" color="#fff">
          <demo-icon name="facebook-circle-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
    </s-share-sheet-row>

    <s-share-sheet-row>
      <s-share-sheet-item value="Spotify" label="Spotify" #icon>
        <s-share-sheet-icon background="#1ed760" color="#fff">
          <demo-icon name="spotify-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Skype" label="Skype" #icon>
        <s-share-sheet-icon background="#0b64a4" color="#fff">
          <demo-icon name="skype-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Youtube" label="Youtube" #icon>
        <s-share-sheet-icon background="#ff0000" color="#fff">
          <demo-icon name="youtube-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Paypal" label="Paypal" #icon>
        <s-share-sheet-icon background="#0070ba" color="#fff">
          <demo-icon name="paypal-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Whatsapp" label="Whatsapp" #icon>
        <s-share-sheet-icon background="#128c7e" color="#fff">
          <demo-icon name="whatsapp-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Telegram" label="Telegram" #icon>
        <s-share-sheet-icon background="#0088cc" color="#fff">
          <demo-icon name="telegram-fill" />
        </s-share-sheet-icon>
      </s-share-sheet-item>
      <s-share-sheet-item value="Snapchat" label="Snapchat" #icon>
        <s-share-sheet-icon background="#fffc00" color="#000">
          <demo-icon name="snapchat-fill" />
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
