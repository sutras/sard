<template>
  <s-list>
    <s-list-item title="联锁使能（仅维护模式可关）">
      <template #value>
        <s-switch :model-value="true" />
      </template>
    </s-list-item>

    <s-list-item arrow hover title="未确认报警">
      <template #value>
        <s-badge :value="3" />
      </template>
    </s-list-item>

    <s-list-item title="主轴转速设定">
      <template #value>
        <div class="rpm">
          <s-slider :model-value="1200" :min="0" :max="3000" />
          <span class="rpm__text">1200 rpm</span>
        </div>
      </template>
    </s-list-item>

    <s-list-item>
      <div class="device">
        <img class="device__photo" :src="cncLathePhoto" alt="CNC-Lathe-01 现场照片" />
        <div class="device__info">
          <div class="device__name">
            CNC-Lathe-01
            <span class="device__code">EQ-2024-017</span>
          </div>
          <div class="device__meta">机加工一线 / ST-04 · 早班 · OEE 87.3 %</div>
        </div>
      </div>
    </s-list-item>

    <s-list-item>
      <s-input v-model="name" inlaid placeholder="操作员工号 例 A-1042" />
    </s-list-item>
    <s-list-item>
      <s-input v-model="pwd" inlaid type="password" placeholder="授权码（6 位）" />
    </s-list-item>
  </s-list>
</template>

<script setup lang="ts">
import { cncLathePhoto } from '@/data/industrial-images'
import { ref } from 'vue'

const name = ref('')
const pwd = ref('')
</script>

<style lang="scss" scoped>
.rpm {
  display: flex;
  align-items: center;
  gap: var(--s-size-sm);
}

.rpm :deep(.s-slider) {
  width: 160px;
}

.rpm__text {
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
  font-variant-numeric: tabular-nums;
}

.device {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--s-size);
}

.device__photo {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: var(--s-border-radius);
  object-fit: cover;
  background: var(--s-fill-color);
}

.device__info {
  min-width: 0;
}

.device__name {
  font-size: var(--s-font-size);
  font-weight: 500;
  color: var(--s-text-color);
}

.device__code {
  margin-inline-start: 6px;
  font-size: var(--s-font-size-sm);
  font-weight: 400;
  color: var(--s-text-color-tertiary);
}

.device__meta {
  margin-top: 2px;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
