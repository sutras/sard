import type { TableColumnProps } from 'sard'
import { deviceStatusMap, devices } from '@/data/production'

/**
 * 车间机台表的列定义：设备编号固定首列，状态/联锁列走具名插槽以渲染状态徽标。
 * 单位与量程与采集网关一致，避免出现无单位裸数值。
 */
export const columns: TableColumnProps[] = [
  {
    label: '设备编号',
    prop: 'code',
    width: 118,
    fixed: 'start',
  },
  {
    label: '产线',
    prop: 'line',
    width: 100,
  },
  {
    label: '工位',
    prop: 'station',
    width: 84,
  },
  {
    label: '班次',
    prop: 'shift',
    width: 64,
  },
  {
    label: '批次号',
    prop: 'batch',
    width: 132,
  },
  {
    label: '状态',
    prop: 'statusLabel',
    width: 84,
    slot: 'status',
  },
  {
    label: '安全联锁',
    prop: 'interlock',
    width: 92,
    slot: 'interlock',
  },
  {
    label: 'OEE',
    prop: 'oee',
    width: 72,
    align: 'end',
  },
  {
    label: '主轴温度',
    prop: 'spindleTemp',
    width: 92,
    align: 'end',
  },
  {
    label: '振动',
    prop: 'vibration',
    width: 84,
    align: 'end',
  },
]

/** 多级表头：按「设备 / 工艺参数 / 质量 / 操作」四组归并现场看板字段 */
export const multiColumns: TableColumnProps[] = [
  {
    label: '设备',
    fixed: 'start',
    columns: [
      {
        label: '设备编号',
        prop: 'code',
        width: 60,
      },
      {
        label: '产线',
        prop: 'line',
        width: 60,
      },
    ],
  },
  {
    label: '工艺参数',
    columns: [
      {
        label: '主轴温度',
        prop: 'spindleTemp',
        width: 92,
      },
      {
        label: '振动',
        prop: 'vibration',
        width: 84,
      },
    ],
  },
  {
    label: '质量与合规',
    columns: [
      {
        label: 'OEE',
        prop: 'oee',
        width: 72,
      },
      {
        label: '安全联锁',
        prop: 'interlock',
        width: 92,
        slot: 'interlock',
      },
    ],
  },
  {
    label: '操作',
    prop: 'action',
    width: 40,
    fixed: 'end',
    slot: 'action',
  },
]

export const partialColumns: TableColumnProps[] = [
  {
    label: '设备编号',
    prop: 'code',
  },
  {
    label: '状态',
    prop: 'statusLabel',
    slot: 'status',
  },
  {
    label: '安全联锁',
    prop: 'interlock',
  },
  {
    label: 'OEE',
    prop: 'oee',
    align: 'end',
  },
]

const formatNumber = (value: number | null, unit: string, digits = 1) =>
  value === null ? '—' : `${value.toFixed(digits)} ${unit}`

export const data = devices.map((device, index) => {
  const status = deviceStatusMap[device.status]

  return {
    id: index + 1,
    code: device.code,
    name: device.name,
    line: device.line,
    station: device.station,
    shift: device.shift,
    batch: device.batch,
    statusCode: status.code,
    statusLabel: status.label,
    statusColor: status.color,
    interlock: device.interlock,
    oee: device.oee === null ? '—' : `${device.oee.toFixed(1)} %`,
    spindleTemp: formatNumber(device.spindleTemp, '°C'),
    vibration: formatNumber(device.vibration, 'mm/s'),
    workOrder: device.workOrder,
  }
})

export const partialData = data.slice(0, 4)
