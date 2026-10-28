<template>
  <!-- 工业语境：看板紧凑排布｜Block 用法演示 -->
  <s-flex vertical gap="medium">
    <s-compact block>
      <s-button block #icon>
        <Question />
      </s-button>
      <s-button block #icon>
        <PencilSquare />
      </s-button>
      <s-button block #icon>
        <Search />
      </s-button>
    </s-compact>

    <s-compact block>
      <s-button block variant="outlined" #icon>
        <Question />
      </s-button>
      <s-button block variant="outlined" #icon>
        <PencilSquare />
      </s-button>
      <s-button block variant="outlined" #icon>
        <Search />
      </s-button>
    </s-compact>
  </s-flex>
</template>

<script setup lang="ts">
import { PencilSquare, Question, Search } from '@sard/icons'
</script>
