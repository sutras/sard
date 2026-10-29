<template>
  <div class="scene">
    <div class="scene__kpis">
      <s-card data-metric="oee" data-unit="%">
        <p class="scene__kpi-label">设备综合效率 OEE</p>
        <p class="scene__kpi-value">
          87.3
          <span>%</span>
        </p>
        <s-progress-bar :percent="87.3" status="success" />
      </s-card>
      <s-card data-metric="yield" data-unit="%">
        <p class="scene__kpi-label">良率</p>
        <p class="scene__kpi-value">
          99.1
          <span>%</span>
        </p>
        <s-progress-bar :percent="99.1" status="success" />
      </s-card>
      <s-card data-metric="utilization" data-unit="%">
        <p class="scene__kpi-label">稼动率</p>
        <p class="scene__kpi-value">
          91.4
          <span>%</span>
        </p>
        <s-progress-bar :percent="91.4" />
      </s-card>
      <s-card data-metric="energy-per-unit" data-unit="kWh/件">
        <p class="scene__kpi-label">单位能耗</p>
        <p class="scene__kpi-value">
          0.42
          <span>kWh/件</span>
        </p>
        <s-progress-bar :percent="62" color="var(--s-color-warning)" />
      </s-card>
    </div>

    <s-table :columns="columns" :data="rows" underlined data-scene="shopfloor-monitor">
      <template #status="{ row }">
        <s-tag :color="row.statusColor" variant="filled" size="small" round>
          {{ row.statusLabel }}
        </s-tag>
      </template>
      <template #interlock="{ row }">
        <s-tag :color="row.interlockColor" variant="outlined" size="small">
          {{ row.interlock }}
        </s-tag>
      </template>
    </s-table>

    <div class="scene__consistency" role="note">
      <p class="scene__consistency-title">同一「运行中」在三端的表达</p>
      <div class="scene__consistency-row">
        <span>监控大屏</span>
        <s-tag size="large" color="success" variant="solid" data-surface="monitor">运行中</s-tag>
      </div>
      <div class="scene__consistency-row">
        <span>移动巡检端</span>
        <s-tag color="success" variant="solid" data-surface="mobile">运行中</s-tag>
      </div>
      <div class="scene__consistency-row">
        <span>班组长看板</span>
        <s-tag size="small" color="success" variant="solid" data-surface="leader-board">
          运行中
        </s-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumnProps } from 'sard'
import { deviceStatusMap, devices, interlockColorMap } from '@/data/production'

const columns: TableColumnProps[] = [
  { label: '设备编号', prop: 'code', width: 118, fixed: 'start' },
  { label: '状态', prop: 'statusLabel', width: 84, slot: 'status' },
  { label: 'OEE', prop: 'oee', width: 76, align: 'end' },
  { label: '主轴温度', prop: 'spindleTemp', width: 92, align: 'end' },
  { label: '安全联锁', prop: 'interlock', width: 96, slot: 'interlock', fixed: 'end' },
]

const rows = devices.slice(0, 5).map((device) => {
  const status = deviceStatusMap[device.status]

  return {
    code: device.code,
    statusLabel: status.label,
    statusColor: status.color,
    oee: device.oee === null ? '—' : `${device.oee.toFixed(1)} %`,
    spindleTemp: device.spindleTemp === null ? '—' : `${device.spindleTemp.toFixed(1)} °C`,
    interlock: device.interlock,
    interlockColor: interlockColorMap[device.interlock],
  }
})
</script>

<style lang="scss" scoped>
.scene {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.scene__kpis {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.scene__kpi-label {
  margin: 0 0 4px;
  font-size: var(--s-font-size-sm);
  color: var(--s-text-color-secondary);
}

.scene__kpi-value {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.1;

  span {
    margin-inline-start: 2px;
    font-size: 12px;
    font-weight: 400;
    color: var(--s-text-color-secondary);
  }
}

.scene__consistency {
  border: 1px dashed var(--s-border-color);
  border-radius: 8px;
  padding: 10px;
}

.scene__consistency-title {
  margin: 0 0 6px;
  font-size: var(--s-font-size-sm);
  font-weight: 600;
}

.scene__consistency-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
  font-size: var(--s-font-size-sm);
}
</style>
