<template>
  <s-space direction="vertical">
    <s-compact direction="vertical" block>
      <s-button #icon>
        <Question />
      </s-button>
      <s-button #icon>
        <PencilSquare />
      </s-button>
      <s-button #icon>
        <Search />
      </s-button>
    </s-compact>

    <s-compact direction="vertical" block>
      <s-button variant="outlined" #icon>
        <Question />
      </s-button>
      <s-button variant="outlined" #icon>
        <PencilSquare />
      </s-button>
      <s-button variant="outlined" #icon>
        <Search />
      </s-button>
    </s-compact>
  </s-space>
</template>

<script setup lang="ts">
import { PencilSquare, Question, Search } from '@sard/icons'
</script>
