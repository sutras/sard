<template>
  <s-accordion v-model="value">
    <s-accordion-item name="1" extra="额外内容">
      <template #title>
        <div class="flex items-center text-(--s-color-primary)">
          <PencilSquare />
          <span class="ms-2">标题1</span>
        </div>
      </template>
      内容1
    </s-accordion-item>
    <s-accordion-item title="标题2" name="2">
      <template #extra>
        <div class="flex items-center text-(--s-color-primary)">
          <span class="me-2">额外内容</span>
          <QuestionCircleFill />
        </div>
      </template>
      内容2
    </s-accordion-item>
    <s-accordion-item title="标题3" name="3">
      <template #arrow="{ visible }">
        <DoubleUp v-if="visible" />
        <DoubleDown v-else />
      </template>
      内容3
    </s-accordion-item>
  </s-accordion>
</template>

<script setup lang="ts">
import { DoubleDown, DoubleUp, PencilSquare, QuestionCircleFill } from '@sard/icons'
import { ref } from 'vue'

const value = ref('1')
</script>
