<template>
  <div>
    <s-load-more disabled :status="status" @load="toast('加载数据')"></s-load-more>

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
import { LoadMoreStatus, toast } from 'sard'
import { ref } from 'vue'

const status = ref(LoadMoreStatus.INCOMPLETE)
const statusList: LoadMoreStatus[] = [
  LoadMoreStatus.INCOMPLETE,
  LoadMoreStatus.LOADING,
  LoadMoreStatus.COMPLETE,
  LoadMoreStatus.ERROR,
]
</script>
