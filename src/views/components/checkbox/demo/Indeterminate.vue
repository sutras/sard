<template>
  <s-checkbox
    v-model:checked="allChecked"
    :indeterminate="isIndeterminate"
    style="margin-bottom: 20px"
    @change="onAllChange"
  >
    全选
  </s-checkbox>

  <s-checkbox-group v-model="checkedResult">
    <s-checkbox v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </s-checkbox>
  </s-checkbox-group>
</template>

<script setup lang="ts">
import { useIndeterminate } from 'sard'
import { ref } from 'vue'

const checkedResult = ref(['option2'])

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' },
]

const { allChecked, isIndeterminate, onAllChange } = useIndeterminate(checkedResult, options)
</script>
