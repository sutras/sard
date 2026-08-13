<template>
  <s-list>
    <s-list-item title="标题">
      <template #value>
        <s-switch :model-value="true" />
      </template>
    </s-list-item>
    <s-list-item arrow hover title="标题">
      <template #value>
        <s-badge :value="20" />
      </template>
    </s-list-item>
    <s-list-item title="音量">
      <template #value>
        <s-slider style="width: 260px" :value="50" />
      </template>
    </s-list-item>

    <s-list-item>
      <div
        style="display: flex; flex-direction: column; align-items: center; padding: 20; gap: 5px"
      >
        <img :src="logo" style="width: 48px; height: 48px" />
        <div style="font-size: 20px">这是标题</div>
        <div>
          这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
        </div>
      </div>
    </s-list-item>
    <s-list-item>
      <s-input v-model="name" inlaid placeholder="请输入用户名" />
    </s-list-item>
    <s-list-item>
      <s-input v-model="pwd" inlaid type="password" placeholder="请输入密码" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import { ref } from 'vue'

const name = ref('')
const pwd = ref('')
</script>
