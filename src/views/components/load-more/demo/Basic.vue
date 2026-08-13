<template>
  <div>
    <s-load-more
      :status="status"
      @load-more="toast('加载更多')"
      @reload="toast('重新加载')"
    ></s-load-more>

    <s-radio-group v-model="status" style="margin-top: 20px" #default="{ toggle }">
      <s-list card>
        <s-list-item
          v-for="(item, i) in statusList"
          :key="i"
          :title="item"
          hover
          @click="toggle(item)"
          #icon
        >
          <s-radio readonly :value="item" />
        </s-list-item>
      </s-list>
    </s-radio-group>
  </div>
</template>

<script setup lang="ts">
import { type LoadMoreStatus, toast } from 'sard'
import { ref } from 'vue'

const status = ref<LoadMoreStatus>('incomplete')
const statusList = ['incomplete', 'loading', 'complete', 'error']
</script>
