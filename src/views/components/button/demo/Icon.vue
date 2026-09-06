<template>
  <s-flex vertical gap="medium">
    <s-flex align="center" gap="medium">
      <s-button :loading="loading" variant="filled" size="xs" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="small" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="medium" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" variant="filled" size="large" #icon>
        <Plus />
      </s-button>
    </s-flex>

    <s-flex align="center" gap="medium">
      <s-button :loading="loading" round size="xs" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="small" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="medium" #icon>
        <Plus />
      </s-button>
      <s-button :loading="loading" round size="large" #icon>
        <Plus />
      </s-button>
    </s-flex>

    <s-flex align="center" gap="medium">
      <s-button :loading="loading" variant="outlined" size="xs">
        <template #icon>
          <Plus />
        </template>
        按钮
      </s-button>
      <s-button :loading="loading" variant="outlined" size="small">
        <template #icon>
          <Plus />
        </template>
        按钮
      </s-button>
      <s-button :loading="loading" variant="outlined" size="medium">
        <template #icon>
          <Plus />
        </template>
        按钮
      </s-button>
      <s-button :loading="loading" variant="outlined" size="large">
        <template #icon>
          <Plus />
        </template>
        按钮
      </s-button>
    </s-flex>

    <s-button @click="loading = !loading">Toggle loading</s-button>
  </s-flex>
</template>

<script setup lang="ts">
import { Plus } from '@sard/icons'
import { ref } from 'vue'
const loading = ref(false)
</script>
