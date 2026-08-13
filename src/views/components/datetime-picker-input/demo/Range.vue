<template>
  <s-form>
    <s-form-item label="开始时间" star-position="end" name="startTime">
      <s-datetime-picker-input
        v-model="formData.startTime"
        title="请选择开始时间"
        placeholder="请选择开始时间"
        clearable
        type="yMdh"
        outlet-format="YYYY-MM-DD HH时"
      />
    </s-form-item>

    <s-form-item label="结束时间" star-position="end" name="endTime">
      <s-datetime-picker-input
        v-model="formData.endTime"
        title="请选择结束时间"
        placeholder="请选择结束时间"
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
