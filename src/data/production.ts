/**
 * 工业语境示例数据源（仅用于文档示例，非组件实现的一部分）
 * 约束：设备编号唯一、量程单位齐全、状态取值来自现场状态机、联锁字段独立于运行状态。
 */

export type DeviceStatus = 'running' | 'idle' | 'alarm' | 'stopped' | 'maintenance'

export type InterlockState = '已闭合' | '未验证' | '已旁路' | '待复位'

export interface DeviceStatusMeta {
  /** 状态机枚举值，与 MES 侧一致 */
  code: string
  label: string
  color: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  icon: string
}

export const deviceStatusMap: Record<DeviceStatus, DeviceStatusMeta> = {
  running: { code: 'RUN', label: '运行中', color: 'success', icon: 'play-circle' },
  idle: { code: 'IDLE', label: '待机', color: 'primary', icon: 'pause-circle' },
  alarm: { code: 'ALARM', label: '报警', color: 'danger', icon: 'alarm' },
  stopped: { code: 'STOP', label: '停机', color: 'default', icon: 'close' },
  maintenance: { code: 'MAINT', label: '维护中', color: 'warning', icon: 'arrow-clockwise' },
}

export const interlockColorMap: Record<InterlockState, 'success' | 'warning' | 'danger'> = {
  已闭合: 'success',
  待复位: 'warning',
  未验证: 'danger',
  已旁路: 'danger',
}

export interface ProductionDevice {
  /** 设备编号，MES 主键，全局唯一 */
  code: string
  /** 设备位号（现场铭牌） */
  name: string
  line: string
  station: string
  shift: '早班' | '中班' | '晚班'
  /** 在制批次号 */
  batch: string
  status: DeviceStatus
  interlock: InterlockState
  /** 设备综合效率，0-100 % */
  oee: number | null
  /** 主轴温度，量程 -20 ~ 120 °C */
  spindleTemp: number | null
  /** 振动烈度，量程 0 ~ 20 mm/s */
  vibration: number | null
  workOrder: string
}

export const devices: ProductionDevice[] = [
  {
    code: 'EQ-2024-017',
    name: 'CNC-Lathe-01',
    line: '机加工一线',
    station: 'ST-04',
    shift: '早班',
    batch: 'L20241027-A03',
    status: 'running',
    interlock: '已闭合',
    oee: 87.3,
    spindleTemp: 62.4,
    vibration: 1.2,
    workOrder: 'WO-20241027-0081',
  },
  {
    code: 'EQ-2024-018',
    name: 'CNC-Mill-02',
    line: '机加工一线',
    station: 'ST-05',
    shift: '早班',
    batch: 'L20241027-A04',
    status: 'running',
    interlock: '已闭合',
    oee: 91.6,
    spindleTemp: 58.1,
    vibration: 0.9,
    workOrder: 'WO-20241027-0082',
  },
  {
    code: 'EQ-2023-204',
    name: '注塑机-A2',
    line: '注塑二线',
    station: 'ST-11',
    shift: '早班',
    batch: 'L20241027-B01',
    status: 'alarm',
    interlock: '未验证',
    oee: 64.2,
    spindleTemp: 96.7,
    vibration: 4.8,
    workOrder: 'WO-20241027-0083',
  },
  {
    code: 'EQ-2024-031',
    name: 'AGV-03',
    line: '物流通道',
    station: 'ST-AGV-03',
    shift: '中班',
    batch: '—',
    status: 'idle',
    interlock: '已闭合',
    oee: null,
    spindleTemp: null,
    vibration: 0.4,
    workOrder: '—',
  },
  {
    code: 'EQ-2022-118',
    name: '机械臂-R06',
    line: '焊装三线',
    station: 'ST-07',
    shift: '中班',
    batch: 'L20241027-C06',
    status: 'maintenance',
    interlock: '待复位',
    oee: 0,
    spindleTemp: 34.2,
    vibration: 0,
    workOrder: 'WO-20241026-0074',
  },
  {
    code: 'EQ-2024-042',
    name: '泵组-P12',
    line: '公用工程',
    station: 'ST-PU-02',
    shift: '晚班',
    batch: '—',
    status: 'running',
    interlock: '已闭合',
    oee: 78.4,
    spindleTemp: 71.5,
    vibration: 2.6,
    workOrder: '—',
  },
  {
    code: 'EQ-2023-076',
    name: '压铸机-D03',
    line: '压铸四线',
    station: 'ST-02',
    shift: '早班',
    batch: 'L20241027-D02',
    status: 'stopped',
    interlock: '已旁路',
    oee: 0,
    spindleTemp: 42.8,
    vibration: 0,
    workOrder: 'WO-20241027-0085',
  },
  {
    code: 'EQ-2024-055',
    name: 'CNC-Lathe-07',
    line: '机加工二线',
    station: 'ST-12',
    shift: '中班',
    batch: 'L20241027-A11',
    status: 'running',
    interlock: '已闭合',
    oee: 83.9,
    spindleTemp: 66.3,
    vibration: 1.4,
    workOrder: 'WO-20241027-0086',
  },
  {
    code: 'EQ-2021-009',
    name: '空压机-C01',
    line: '公用工程',
    station: 'ST-PU-01',
    shift: '晚班',
    batch: '—',
    status: 'alarm',
    interlock: '未验证',
    oee: 52.1,
    spindleTemp: 88.9,
    vibration: 6.3,
    workOrder: '—',
  },
  {
    code: 'EQ-2024-063',
    name: '贴标机-L05',
    line: '包装五线',
    station: 'ST-09',
    shift: '早班',
    batch: 'L20241027-E05',
    status: 'idle',
    interlock: '已闭合',
    oee: 46.7,
    spindleTemp: 38.4,
    vibration: 0.6,
    workOrder: 'WO-20241027-0087',
  },
  {
    code: 'EQ-2023-152',
    name: '视觉检测-V02',
    line: '包装五线',
    station: 'ST-10',
    shift: '早班',
    batch: 'L20241027-E05',
    status: 'running',
    interlock: '已闭合',
    oee: 95.2,
    spindleTemp: 41.6,
    vibration: 0.3,
    workOrder: 'WO-20241027-0087',
  },
  {
    code: 'EQ-2022-087',
    name: '热处理炉-H02',
    line: '热处理线',
    station: 'ST-01',
    shift: '晚班',
    batch: 'L20241027-F01',
    status: 'maintenance',
    interlock: '待复位',
    oee: 0,
    spindleTemp: 112.5,
    vibration: 0,
    workOrder: 'WO-20241026-0079',
  },
  {
    code: 'EQ-2024-091',
    name: 'AGV-07',
    line: '物流通道',
    station: 'ST-AGV-07',
    shift: '晚班',
    batch: '—',
    status: 'running',
    interlock: '已闭合',
    oee: null,
    spindleTemp: null,
    vibration: 0.5,
    workOrder: '—',
  },
  {
    code: 'EQ-2023-133',
    name: '注塑机-A5',
    line: '注塑二线',
    station: 'ST-13',
    shift: '中班',
    batch: 'L20241027-B07',
    status: 'running',
    interlock: '已闭合',
    oee: 88.8,
    spindleTemp: 94.1,
    vibration: 2.1,
    workOrder: 'WO-20241027-0088',
  },
]

export interface AlarmRecord {
  id: string
  level: 'info' | 'warning' | 'critical'
  source: string
  code: string
  message: string
  at: string
  /** 是否已由当班人员确认 */
  acked: boolean
}

export const alarms: AlarmRecord[] = [
  {
    id: 'ALM-20241027-0031',
    level: 'critical',
    source: '注塑机-A2',
    code: 'E-1042',
    message: '模具区安全门联锁断开，液压单元已紧急泄压',
    at: '2024-10-27 09:41:22',
    acked: false,
  },
  {
    id: 'ALM-20241027-0030',
    level: 'warning',
    source: 'CNC-Lathe-01',
    code: 'W-2081',
    message: '主轴温度 62.4 °C，接近预警阈值 65 °C（量程 -20 ~ 120 °C）',
    at: '2024-10-27 09:37:05',
    acked: false,
  },
  {
    id: 'ALM-20241027-0029',
    level: 'info',
    source: 'AGV-03',
    code: 'I-0301',
    message: '电量 21 %，已自动返回充电桩（阈值 20 %）',
    at: '2024-10-27 09:12:48',
    acked: true,
  },
]

/** 设备实体（用于图标语义建模示例）：deviceType 与 unitCode 与采集侧网关约定一致 */
export interface DeviceEntity {
  id: string
  deviceType: string
  label: string
  unitCode: string
  minValue: number
  maxValue: number
  unit: string
}

export const deviceEntities: DeviceEntity[] = [
  {
    id: 'pump',
    deviceType: 'centrifugal_pump',
    label: '离心泵',
    unitCode: 'PUMP-P12',
    minValue: 0,
    maxValue: 1.6,
    unit: 'MPa',
  },
  {
    id: 'motor',
    deviceType: 'induction_motor',
    label: '三相异步电机',
    unitCode: 'MTR-M08',
    minValue: 0,
    maxValue: 3000,
    unit: 'rpm',
  },
  {
    id: 'sensor',
    deviceType: 'temp_sensor',
    label: '温度传感器',
    unitCode: 'SEN-T04',
    minValue: -20,
    maxValue: 120,
    unit: '°C',
  },
  {
    id: 'valve',
    deviceType: 'pneumatic_valve',
    label: '气动阀',
    unitCode: 'VLV-V21',
    minValue: 0,
    maxValue: 100,
    unit: '%',
  },
  {
    id: 'agv',
    deviceType: 'agv',
    label: 'AGV 搬运车',
    unitCode: 'AGV-03',
    minValue: 0,
    maxValue: 2,
    unit: 'm/s',
  },
  {
    id: 'robot-arm',
    deviceType: 'six_axis_robot',
    label: '六轴机械臂',
    unitCode: 'RBT-R06',
    minValue: 0,
    maxValue: 180,
    unit: '°',
  },
]
