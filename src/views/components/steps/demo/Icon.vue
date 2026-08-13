<template>
  <s-list card>
    <s-list-item title="上一步" @click="prevStep" arrow hover />
    <s-list-item title="下一步" @click="nextStep" arrow hover />
    <s-list-item>
      <s-steps :current="current" :item-list="itemList" center>
        <s-step
          v-for="(item, i) in itemList"
          :key="i"
          :index="i"
          :name="item.name"
          :description="item.description"
        >
          <template #icon="{ status }">
            <demo-icon v-if="status === 'finish'" name="star-fill" size="20px" />
            <demo-icon v-else-if="status === 'process'" name="star" size="20px" />
            <demo-icon v-else-if="status === 'wait'" name="star" size="20px" />
            <demo-icon v-else-if="status === 'error'" name="star" size="20px" />
          </template>
        </s-step>
      </s-steps>
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
