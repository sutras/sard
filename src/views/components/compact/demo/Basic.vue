<template>
  <s-space direction="vertical">
    <s-compact>
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

    <s-compact>
      <s-button variant="filled" #icon>
        <Question />
      </s-button>
      <s-button variant="filled" #icon>
        <PencilSquare />
      </s-button>
      <s-button variant="filled" #icon>
        <Search />
      </s-button>
    </s-compact>

    <s-compact>
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

    <s-compact>
      <s-button variant="text" #icon>
        <Question />
      </s-button>
      <s-button variant="text" #icon>
        <PencilSquare />
      </s-button>
      <s-button variant="text" #icon>
        <Search />
      </s-button>
    </s-compact>

    <s-compact>
      <s-button variant="link" #icon>
        <Question />
      </s-button>
      <s-button variant="link" #icon>
        <PencilSquare />
      </s-button>
      <s-button variant="link" #icon>
        <Search />
      </s-button>
    </s-compact>

    <s-compact>
      <s-button variant="solid" #icon>
        <Question />
      </s-button>
      <s-button variant="filled" #icon>
        <PencilSquare />
      </s-button>
      <s-button variant="outlined" #icon>
        <Plus />
      </s-button>
      <s-button variant="filled" #icon>
        <Search />
      </s-button>
    </s-compact>
  </s-space>
</template>

<script setup lang="ts">
import { PencilSquare, Plus, Question, Search } from '@sard/icons'
</script>
