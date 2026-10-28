<template>
  <!-- 工业语境：工单计划开工时刻选择｜Range 用法演示 -->
  <s-form>
    <s-form-item label="开始时间" star-position="end" name="startTime">
      <s-datetime-picker-input
        v-model="formData.startTime"
        title="选择产线开始时间"
        placeholder="选择产线开始时间"
        clearable
        type="yMdh"
        outlet-format="YYYY-MM-DD HH时"
      />
    </s-form-item>

    <s-form-item label="结束时间" star-position="end" name="endTime">
      <s-datetime-picker-input
        v-model="formData.endTime"
        title="选择产线结束时间"
        placeholder="选择产线结束时间"
        clearable
        type="yMdh"
        outlet-format="YYYY-MM-DD HH时"
        :min="formData.startTime"
      />
    </s-form-item>
  </s-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  startTime: undefined,
  endTime: undefined,
})
</script>
