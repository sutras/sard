<template>
  <s-space direction="vertical">
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
  </s-space>
</template>

<script setup lang="ts">
import { PencilSquare, Question, Search } from '@sard/icons'
</script>
