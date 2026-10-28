<template>
  <!-- 演示工单/点检图标按钮：纯图标按钮必须配 aria-label，巡检手套操作时依赖大点击热区 -->
  <s-flex vertical gap="medium">
    <s-flex align="center" gap="medium">
      <s-button :loading="loading" variant="filled" size="xs" aria-label="新建工单" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="small" aria-label="新建工单" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="medium" aria-label="新建工单" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="large" aria-label="新建工单" #icon>
        <Plus />
      </s-button>
    </s-flex>

    <s-flex align="center" gap="medium">
      <s-button :loading="loading" round size="xs" aria-label="点检打卡" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="small" aria-label="点检打卡" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="medium" aria-label="点检打卡" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="large" aria-label="点检打卡" #icon>
        <Plus />
      </s-button>
    </s-flex>

    <s-flex align="center" gap="medium" wrap>
      <s-button :loading="loading" variant="outlined" size="xs" aria-label="补录批次">
        <template #icon>
          <Plus />
        </template>
        补录批次
      </s-button>
      <s-button :loading="loading" variant="outlined" size="small" aria-label="补录批次">
        <template #icon>
          <Plus />
        </template>
        补录批次
      </s-button>
      <s-button :loading="loading" variant="outlined" size="medium" aria-label="补录批次">
        <template #icon>
          <Plus />
        </template>
        补录批次
      </s-button>
      <s-button :loading="loading" variant="outlined" size="large" aria-label="补录批次">
        <template #icon>
          <Plus />
        </template>
        补录批次
      </s-button>
    </s-flex>

    <s-button @click="loading = !loading">切换下发状态</s-button>
  </s-flex>
</template>

<script setup lang="ts">
import { Plus } from '@sard/icons'
import { ref } from 'vue'
const loading = ref(false)
</script>
