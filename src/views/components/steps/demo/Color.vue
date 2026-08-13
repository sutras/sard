<template>
  <s-list card>
    <s-list-item title="上一步" @click="prevStep" arrow hover />
    <s-list-item title="下一步" @click="nextStep" arrow hover />
    <s-list-item>
      <s-steps
        :current="current"
        :item-list="itemList"
        center
        style="
          --s-steps-icon-color-finish: var(--s-color-warning);
          --s-steps-icon-color-process: var(--s-color-warning);
          --s-steps-text-color-process: var(--s-color-warning);
          --s-steps-line-color-active: var(--s-color-warning);
        "
      />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type StepsItem } from 'sard'

const current = ref(1)

const itemList: StepsItem[] = [{ name: '步骤1' }, { name: '步骤2' }, { name: '步骤3' }]

const prevStep = () => {
  current.value = current.value <= 0 ? 3 : current.value - 1
}

const nextStep = () => {
  current.value = current.value >= 3 ? 0 : current.value + 1
}
</script>
