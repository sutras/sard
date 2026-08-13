<template>
  <s-list card>
    <s-list-item>
      <s-picker-view v-model:value="value">
        <s-picker-view-column>
          <div v-for="item in columns" :key="item" class="item">{{ item }}</div>
        </s-picker-view-column>
      </s-picker-view>
    </s-list-item>
    <s-list-item title="当前值：" :value="JSON.stringify(value)" />
    <s-list-item title="设置为: 天津市" arrow hover @click="value = [1]" />
    <s-list-item title="清空" arrow hover @click="value = []" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const columns = ['北京市', '天津市', '河北省', '山东省']

const value = ref<number[]>()
</script>

<style scoped>
.item {
  line-height: 48px;
  text-align: center;
}
</style>
