import type { TableColumnProps } from 'sard'

/** 点检与保养等级标准：每个等级对应固定频次、停机窗口与授权角色，供大屏对照执行 */
export const columns: TableColumnProps[] = [
  {
    label: '保养等级',
    prop: 'level',
    fixed: true,
  },
  {
    label: '点检项',
    prop: 'items',
  },
  {
    label: '执行频次',
    prop: 'frequency',
  },
  {
    label: '润滑要求',
    prop: 'lubrication',
  },
  {
    label: '联锁测试',
    prop: 'interlock',
  },
  {
    label: '精度校准',
    prop: 'calibration',
  },
  {
    label: '停机窗口',
    prop: 'window',
  },
  {
    label: '授权角色',
    prop: 'role',
  },
] as const

export const data = [
  {
    level: 'A 班前点检',
    items: '12 项',
    frequency: '每 8 h',
    lubrication: '导轨油位 ≥ 60 %',
    interlock: '光栅自检通过',
    calibration: '不要求',
    window: '15 min',
    role: '操作工',
  },
  {
    level: 'B 日检',
    items: '24 项',
    frequency: '每 24 h',
    lubrication: '手动注油 3 点',
    interlock: '安全门双通道',
    calibration: '不要求',
    window: '30 min',
    role: '操作工',
  },
  {
    level: 'C 周保',
    items: '38 项',
    frequency: '每 7 d',
    lubrication: '更换滤芯 1 只',
    interlock: '急停回路实测',
    calibration: '主轴跳动 ≤ 0.02 mm',
    window: '2 h',
    role: '机修工',
  },
  {
    level: 'D 月保',
    items: '56 项',
    frequency: '每 30 d',
    lubrication: '集中润滑换脂',
    interlock: '联锁旁路登记',
    calibration: '定位精度 ≤ 0.01 mm',
    window: '4 h',
    role: '机修工',
  },
  {
    level: 'E 季度校准',
    items: '18 项',
    frequency: '每 90 d',
    lubrication: '液压油化验',
    interlock: '全回路验证',
    calibration: '激光干涉仪校准',
    window: '8 h',
    role: '工艺工程师',
  },
  {
    level: 'F 年度大修',
    items: '96 项',
    frequency: '每 365 d',
    lubrication: '整机换油 120 L',
    interlock: '第三方复检',
    calibration: '全行程补偿',
    window: '72 h',
    role: '设备主管',
  },
]
