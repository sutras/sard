<template>
  <s-space direction="vertical">
    <s-compact block>
      <s-input v-model="value" placeholder="请输入" />
      <s-input v-model="value" placeholder="请输入" />
    </s-compact>
    <s-compact block>
      <s-input v-model="value" placeholder="请输入" style="width: 80px" />
      <s-input v-model="value" placeholder="请输入" />
    </s-compact>
    <s-compact block>
      <s-input v-model="value" placeholder="请输入" />
      <s-button>
        <PencilSquare />
      </s-button>
    </s-compact>
    <s-compact block>
      <s-button>
        <Search />
      </s-button>
      <s-input v-model="value" placeholder="请输入" />
      <s-input v-model="value" placeholder="请输入" />
    </s-compact>
    <s-compact block>
      <s-button>
        <Search />
      </s-button>
      <s-input v-model="value" placeholder="请输入" />
      <s-button>
        <PencilSquare />
      </s-button>
      <s-input v-model="value" placeholder="请输入" />
    </s-compact>
    <s-compact block>
      <s-datetime-picker-input type="yM" :input-props="{ inlaid: false }" placeholder="请选择">
        <template #arrow>
          <Down />
        </template>
      </s-datetime-picker-input>

      <s-input v-model="value" placeholder="请输入" />

      <s-datetime-picker-input type="yM" :input-props="{ inlaid: false }" placeholder="请选择">
        <template #arrow>
          <Down />
        </template>
      </s-datetime-picker-input>
    </s-compact>
  </s-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Down, PencilSquare, Search } from '@sard/icons'

const value = ref('')
</script>
