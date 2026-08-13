<template>
  <s-swipe-action-group ref="groupRef">
    <s-list card>
      <s-list-item>
        <s-button size="small" @click="groupRef?.closeAll()">关闭全部</s-button>
      </s-list-item>

      <s-list-item style="padding: 1px 0 0 0">
        <s-swipe-action>
          <s-list-item title="消息提醒" value="向左滑动" />
          <template #right="{ hide }">
            <s-button color="danger" square auto-height @click="onClick('删除', hide)">
              删除
            </s-button>
          </template>
        </s-swipe-action>
      </s-list-item>

      <s-list-item style="padding: 1px 0 0 0">
        <s-swipe-action>
          <s-list-item title="订单通知" value="只会展开一个" />
          <template #right="{ hide }">
            <s-button color="warning" square auto-height @click="onClick('标记已读', hide)">
              已读
            </s-button>
            <s-button color="danger" square auto-height @click="onClick('删除', hide)">
              删除
            </s-button>
          </template>
        </s-swipe-action>
      </s-list-item>

      <s-list-item style="padding: 1px 0 0 0">
        <s-swipe-action>
          <s-list-item title="系统公告" value="打开其他项会自动关闭当前项" />
          <template #right="{ hide }">
            <s-button color="primary" square auto-height @click="onClick('查看', hide)">
              查看
            </s-button>
          </template>
        </s-swipe-action>
      </s-list-item>
    </s-list>
  </s-swipe-action-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast, type SwipeActionGroupExpose } from 'sard'

const groupRef = ref<SwipeActionGroupExpose>()

const onClick = (content: string, hide: () => void) => {
  toast(`点击了${content}`)
  hide()
}
</script>
