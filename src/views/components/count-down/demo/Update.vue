<template>
  <s-list card>
    <s-list-item>
      <s-count-down
        ref="countDown"
        class="font-mono"
        :time="time"
        format="ss:SS"
        millisecond
        @finish="toast('到时了!')"
      />
    </s-list-item>
    <s-list-item title="点击更新倒计时" arrow hover @click="update"></s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import { random, toast } from 'sard'

const time = ref(1000 * 10)

const elRef = useTemplateRef('countDown')

const update = () => {
  const newTime = random(3, 10) * 1000
  toast(`更新倒计时：${newTime / 1000}s`)
  time.value = newTime
  nextTick(() => {
    elRef.value?.reset()
  })
}
</script>
