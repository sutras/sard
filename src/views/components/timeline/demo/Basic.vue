<template>
  <!-- 工业语境：停机处置时间线 —— 从报警触发到恢复生产，每一步都带责任角色与时间戳 -->
  <s-timeline aria-label="停机处置时间线">
    <s-timeline-item
      v-for="(item, index) in events"
      :key="index"
      :title="item.title"
      :time="item.time"
      :style="{
        color: index !== 1 ? 'var(--s-text-color-tertiary)' : '',
      }"
    >
      <template v-if="item.icon" #icon>
        <demo-icon :name="item.icon" :color="item.iconColor" />
      </template>
      <div v-if="item.tel">
        <template v-for="(subStr, i) in item.description.split(/(\${tel})/)" :key="i">
          <span v-if="subStr === '${tel}'" style="color: var(--s-color-primary)">
            {{ item.tel }}
          </span>
          <span v-else>{{ subStr }}</span>
        </template>
      </div>
      <template v-else>
        {{ item.description }}
      </template>
    </s-timeline-item>
  </s-timeline>
</template>

<script setup lang="ts">
const events = [
  {
    description: '设备：EQ-2023-204 注塑机-A2（注塑二线 / ST-11）',
  },
  {
    icon: 'quality',
    iconColor: 'var(--s-color-primary)',
    title: '恢复生产',
    description:
      '设备主管复位并联锁复检通过，首件检验合格。复检人：设备主管，${tel}。批次 L20241027-B01 已重新开工。',
    tel: '内线 8102',
    time: '2024-10-27 10:26:04',
  },
  {
    icon: 'work-order',
    title: '维修处置完成',
    description: '更换安全门双通道开关，联锁旁路单 LK-20241027-02 已核销。',
    time: '2024-10-27 10:08:37',
  },
  {
    icon: 'wrench',
    title: '维修班到达现场',
    description: '维修班 2 人到场（工单 WO-20241027-0085），到场耗时 8 min。',
    time: '2024-10-27 09:52:11',
  },
  {
    icon: 'key',
    title: '班组长授权停机',
    description: '班组长授权码校验通过，液压单元泄压，在制批次 1200 件转返修判定。',
    time: '2024-10-27 09:44:05',
  },
  {
    description: '报警确认：值班人员确认 E-1042，处置记录 ALM-20241027-0031 已建立。',
    time: '2024-10-27 09:42:30',
  },
  {
    icon: 'alarm',
    title: '安全门联锁断开',
    description: 'E-1042 模具区安全门联锁断开，设备自动进入 STOP 状态。',
    time: '2024-10-27 09:41:22',
  },
]
</script>
