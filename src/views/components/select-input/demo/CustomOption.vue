<template>
  <!-- 工业语境：设备选择，选项里同时给出位号、运行状态与 OEE，替代只有名称的默认选项｜CustomOption 用法演示 -->
  <s-list card>
    <s-list-item>
      <s-select-input
        v-model="value"
        title="选择设备"
        placeholder="选择设备"
        clearable
        :options="devices"
        @change="onChange"
      >
        <div class="device-list">
          <s-select-option
            v-for="item in devices"
            :key="item.value"
            :value="item.value"
            plain
            #default="{ selected }"
          >
            <s-button block variant="outlined" :color="selected ? 'primary' : 'secondary'">
              <span class="device-dot" :data-status="item.status"></span>
              <span class="device-code">{{ item.label }}</span>
              <span class="device-oee">OEE {{ item.oee }}</span>
            </s-button>
          </s-select-option>
        </div>
      </s-select-input>
    </s-list-item>

    <s-list-item title="当前值：" :value="JSON.stringify(value) ?? 'undefined'" />
    <s-list-item
      title="设置为：EQ-2023-204（注塑机-A2）"
      arrow
      hover
      @click="value = 'EQ-2023-204'"
    />
    <s-list-item title="清空" arrow hover @click="value = undefined" />
  </s-list>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const devices = [
  { value: 'EQ-2024-017', label: 'CNC-Lathe-01', status: 'running', oee: '87.3 %' },
  { value: 'EQ-2023-204', label: '注塑机-A2', status: 'alarm', oee: '62.8 %' },
  { value: 'AGV-03', label: 'AGV-03', status: 'idle', oee: '—' },
  { value: 'EQ-2022-076', label: '压铸机-D03', status: 'stopped', oee: '0 %' },
]

const value = ref<string>()

const onChange = (value: any) => {
  console.log('设备切换', value)
}
</script>

<style lang="scss" scoped>
.device-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px;
}

.device-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--s-text-color-tertiary);
}

.device-dot[data-status='running'] {
  background: var(--s-color-success);
}

.device-dot[data-status='alarm'] {
  background: var(--s-color-danger);
}

.device-dot[data-status='stopped'] {
  background: var(--s-text-color-disabled);
}

.device-code {
  margin-inline-start: 8px;
  text-align: start;
}

.device-oee {
  margin-inline-start: auto;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
}
</style>
