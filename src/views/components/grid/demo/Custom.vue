<template>
  <s-grid>
    <s-grid-item v-for="item in lineMetrics" :key="item.line">
      <template #content>
        <div class="metric" :data-status="item.status">
          <span class="metric__line">{{ item.line }}</span>
          <span class="metric__value">
            {{ item.oee }}
            <span class="metric__unit">%</span>
          </span>
        </div>
      </template>
    </s-grid-item>
  </s-grid>

  <s-grid :columns="3" square :gap="8" class="mt-4">
    <s-grid-item v-for="url in urls" :key="url">
      <s-image :src="url" width="100%" height="100%" radius="8px" class="flex!" />
    </s-grid-item>
  </s-grid>
</template>

<script setup lang="ts">
import { galleryPhotos } from '@/data/industrial-images'

const lineMetrics = [
  { line: '机加工一线', oee: 87.3, status: 'running' },
  { line: '注塑二线', oee: 91.4, status: 'running' },
  { line: '压铸四线', oee: 62.8, status: 'alarm' },
  { line: '包装五线', oee: 78.5, status: 'stopped' },
]

const urls = galleryPhotos.slice(0, 6).map((item) => item.url)
</script>

<style lang="scss" scoped>
.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.metric__line {
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
}

.metric__value {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--s-color-success);
}

.metric__unit {
  font-size: 12px;
  font-weight: 400;
}

.metric[data-status='alarm'] .metric__value {
  color: var(--s-color-danger);
}

.metric[data-status='stopped'] .metric__value {
  color: var(--s-text-color-tertiary);
}
</style>
