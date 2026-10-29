<template>
  <s-table
    bordered
    :columns="columns"
    :data="data"
    :span-method="spanMethod"
    data-scene="line-downtime-table"
  ></s-table>
</template>

<script setup lang="ts">
const columns = [
  { label: '产线', prop: 'line', width: 110 },
  { label: '工位', prop: 'station', width: 90 },
  { label: '设备编号', prop: 'code', width: 120 },
  { label: '班次', prop: 'shift', width: 80 },
  { label: '点检结果', prop: 'check', width: 100 },
  { label: '停机原因', prop: 'reason', width: 180 },
]

const data = [
  {
    line: '机加工一线',
    station: 'ST-04',
    code: 'EQ-2024-017',
    shift: '早班',
    check: '合格',
    reason: '换刀',
  },
  {
    line: '机加工一线',
    station: 'ST-05',
    code: 'EQ-2024-018',
    shift: '早班',
    check: '合格',
    reason: '等待来料',
  },
  {
    line: '注塑二线',
    station: 'ST-11',
    code: 'EQ-2023-204',
    shift: '早班',
    check: '不合格',
    reason: '安全门联锁断开',
  },
  {
    line: '注塑二线',
    station: 'ST-13',
    code: 'EQ-2023-133',
    shift: '中班',
    check: '合格',
    reason: '模具升温',
  },
  {
    line: '压铸四线',
    station: 'ST-02',
    code: 'EQ-2023-076',
    shift: '早班',
    check: '待复检',
    reason: '液压超压报警',
  },
  {
    line: '热处理线',
    station: 'ST-01',
    code: 'EQ-2022-087',
    shift: '晚班',
    check: '合格',
    reason: '计划保养',
  },
]

const spanMethod = ({ row, rowIndex, columnIndex }: any) => {
  if (columnIndex === 0) {
    if (rowIndex > 0 && data[rowIndex - 1].line === row.line) {
      return { rowspan: 0, colspan: 0 }
    }
    let rowspan = 1
    while (rowIndex + rowspan < data.length && data[rowIndex + rowspan].line === row.line) {
      rowspan++
    }
    return { rowspan, colspan: 1 }
  }
}
</script>
