<template>
  <s-list card>
    <s-dnd v-model:list="listData" #default="{ list }">
      <s-dnd-item v-for="{ data, key, itemInfo } in list" :item-info="itemInfo" :key="key">
        <s-list-item :title="data.title">
          <template #value>
            <s-dnd-handle>
              <s-text color="tertiary" size="large">
                <List />
              </s-text>
            </s-dnd-handle>
          </template>
        </s-list-item>
      </s-dnd-item>
    </s-dnd>
  </s-list>
</template>

<script setup lang="ts">
import { List } from '@sard/icons'
import { ref } from 'vue'

const listData = ref(
  Array(10)
    .fill(0)
    .map((_, i) => {
      return {
        title: `标题${i}`,
      }
    }),
)
</script>
