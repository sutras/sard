<template>
  <div class="entity-modeling">
    <div class="entity-modeling__palette" role="list">
      <button
        v-for="entity in deviceEntities"
        :key="entity.id"
        class="entity-chip"
        type="button"
        draggable="true"
        role="listitem"
        :data-entity-type="entity.deviceType"
        :data-unit-code="entity.unitCode"
        @dragstart="onDragStart(entity, $event)"
        @click="select(entity)"
      >
        <svg
          viewBox="0 0 24 24"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path :d="entityIcons[entity.id]" />
        </svg>
        <span class="entity-chip__label">{{ entity.label }}</span>
      </button>
    </div>

    <div
      class="entity-modeling__canvas"
      :class="{ 'is-over': hovering }"
      role="region"
      data-drop-target="device-entity"
      @dragover.prevent="hovering = true"
      @dragleave="hovering = false"
      @drop.prevent="onDrop"
    >
      <template v-if="current">
        <div class="entity-modeling__head">
          <strong>{{ current.label }}</strong>
          <s-tag color="primary" variant="outlined" size="small">
            {{ current.deviceType }}
          </s-tag>
        </div>

        <s-form :model="config" label-width="6em" direction="vertical">
          <s-form-item label="位号 unitCode">
            <s-input v-model="config.unitCode" inlaid placeholder="例 PUMP-P12" />
          </s-form-item>
          <s-form-item label="量程下限">
            <s-input v-model="config.minValue" inlaid type="number" />
          </s-form-item>
          <s-form-item label="量程上限">
            <s-input v-model="config.maxValue" inlaid type="number" />
          </s-form-item>
          <s-form-item label="工程单位">
            <s-input v-model="config.unit" inlaid />
          </s-form-item>
        </s-form>

        <p class="entity-modeling__semantic" data-semantic="device-entity" aria-live="polite">
          {{ semanticText }}
        </p>
      </template>
      <p v-else class="entity-modeling__empty">
        将左侧实体拖到此处（或点击图标），生成带量程与单位的标准化语义描述。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { deviceEntities, type DeviceEntity } from '@/data/production'

/** 演示用工业实体线性图标（24×24 画布，stroke 1.7，圆角端点，与组件库图标风格保持一致） */
const entityIcons: Record<string, string> = {
  pump: 'M6 20h12M8.5 20v-4h7v4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8M12 8V5h5',
  motor: 'M3 9h11v6H3zM14 12h4M18 12v3M5.5 9V7M9 9V7',
  sensor: 'M12 3v8M9 11h6v3a3 3 0 0 1-6 0zM12 17v4',
  valve: 'M4 8l8 4-8 4zM20 8l-8 4 8 4zM12 3v5M12 16v5',
  agv: 'M3 15h12V9H6l-3 6zM3 15v3h2M17 18h2v-6h-4M7 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M15 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3',
  'robot-arm': 'M5 20v-3h4v3M7 17V9l6-4 4 3M13 9l3 4-2 4',
}

const hovering = ref(false)
const dragged = ref<DeviceEntity | null>(null)
const current = ref<DeviceEntity | null>(null)

const config = reactive({
  unitCode: '',
  minValue: '',
  maxValue: '',
  unit: '',
})

const select = (entity: DeviceEntity) => {
  current.value = entity
  config.unitCode = entity.unitCode
  config.minValue = String(entity.minValue)
  config.maxValue = String(entity.maxValue)
  config.unit = entity.unit
}

const onDragStart = (entity: DeviceEntity, event: DragEvent) => {
  dragged.value = entity
  event.dataTransfer?.setData('text/plain', entity.deviceType)
}

const onDrop = (event: DragEvent) => {
  hovering.value = false
  const type = event.dataTransfer?.getData('text/plain')
  const entity = deviceEntities.find((item) => item.deviceType === type || item.id === type)
  if (entity) {
    select(entity)
  }
}

const semanticText = computed(() => {
  if (!current.value) {
    return ''
  }
  return `deviceType=${current.value.deviceType}; unitCode=${config.unitCode}; range=[${config.minValue},${config.maxValue}]${config.unit}; point=${config.unitCode}.PV; status=alarm|idle|running|stopped|maintenance`
})
</script>

<style lang="scss" scoped>
.entity-modeling {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.entity-modeling__palette {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.entity-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 1px dashed var(--s-border-color);
  border-radius: 8px;
  padding: 10px 4px;
  background: var(--s-bg-color-container);
  color: var(--s-text-color-primary);
  font-size: var(--s-font-size-sm);
  cursor: grab;

  &:focus-visible {
    outline: 2px solid var(--s-color-primary);
    outline-offset: 2px;
  }
}

.entity-chip__label {
  line-height: 1.2;
  text-align: center;
}

.entity-modeling__canvas {
  min-height: 180px;
  border: 1px dashed var(--s-border-color);
  border-radius: 10px;
  padding: 12px;
  transition: border-color 0.2s;

  &.is-over {
    border-color: var(--s-color-primary);
  }
}

.entity-modeling__head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.entity-modeling__semantic {
  margin-top: 8px;
  border-radius: 6px;
  padding: 8px;
  background: var(--s-fill-color);
  font-family: var(--s-font-family-mono, monospace);
  font-size: var(--s-font-size-sm);
  word-break: break-all;
}

.entity-modeling__empty {
  margin: 0;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
}
</style>
