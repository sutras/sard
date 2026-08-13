<template>
  <s-list card>
    <s-list-item>
      <s-count-down
        ref="elRef"
        class="font-mono mx-auto"
        :time="1000 * 10"
        format="ss:SS"
        millisecond
        :auto-start="false"
        @finish="toast('到时了!')"
      />
    </s-list-item>
    <s-list-item>
      <s-grid clickable :columns="3">
        <s-grid-item text="开始" @click="() => elRef?.start()" #icon>
          <demo-icon name="play-circle" />
        </s-grid-item>
        <s-grid-item text="暂停" @click="() => elRef?.pause()" #icon>
          <demo-icon name="pause-circle" />
        </s-grid-item>
        <s-grid-item text="重置" @click="() => elRef?.reset()" #icon>
          <demo-icon name="arrow-clockwise" />
        </s-grid-item>
      </s-grid>
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type CountDownExpose } from 'sard'

const elRef = ref<CountDownExpose>()
</script>
