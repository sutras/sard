/**
 * 工业示例图片源（示例层专用）
 * 全部为本地资源，避免示例依赖外部图床；每张图对应一个车间实体或工序。
 */
import shopfloor from '@/assets/images/industrial/shopfloor.jpg'
import cncLathe from '@/assets/images/industrial/cnc-lathe.jpg'
import injectionAlarm from '@/assets/images/industrial/injection-alarm.jpg'
import robotArm from '@/assets/images/industrial/robot-arm.jpg'
import agv from '@/assets/images/industrial/agv.jpg'
import pumpSkid from '@/assets/images/industrial/pump-skid.jpg'
import controlCabinet from '@/assets/images/industrial/control-cabinet.jpg'
import sensorGauge from '@/assets/images/industrial/sensor-gauge.jpg'
import nameplate from '@/assets/images/industrial/nameplate.jpg'
import inspection from '@/assets/images/industrial/inspection.jpg'
import firstArticle from '@/assets/images/industrial/first-article.jpg'
import operatorPortrait from '@/assets/images/industrial/operator-portrait.jpg'

export interface IndustrialPhoto {
  /** 图片编号，对应 MES 附件 ID */
  id: number
  url: string
  title: string
  caption: string
}

export const shopfloorPhoto = shopfloor
export const cncLathePhoto = cncLathe
export const injectionAlarmPhoto = injectionAlarm
export const robotArmPhoto = robotArm
export const agvPhoto = agv
export const pumpSkidPhoto = pumpSkid
export const controlCabinetPhoto = controlCabinet
export const sensorGaugePhoto = sensorGauge
export const nameplatePhoto = nameplate
export const inspectionPhoto = inspection
export const firstArticlePhoto = firstArticle
export const operatorPortraitPhoto = operatorPortrait

export const galleryPhotos: IndustrialPhoto[] = [
  {
    id: 1,
    url: shopfloor,
    title: '机加工一线全景',
    caption: '14 台设备联网 · 黄色安全通道',
  },
  {
    id: 2,
    url: cncLathe,
    title: 'CNC-Lathe-01 切削中',
    caption: '主轴 1200 rpm · 冷却液开启',
  },
  {
    id: 3,
    url: injectionAlarm,
    title: '注塑机-A2 报警现场',
    caption: 'E-1042 安全门联锁断开',
  },
  {
    id: 4,
    url: robotArm,
    title: '机械臂-R06 焊装',
    caption: '焊装三线 · 光栅保护中',
  },
  {
    id: 5,
    url: agv,
    title: 'AGV-03 物料配送',
    caption: '物流通道 · 载重 480 kg',
  },
  {
    id: 6,
    url: pumpSkid,
    title: '泵组-P12 运行中',
    caption: '出口压力 0.82 MPa · 46 °C',
  },
  {
    id: 7,
    url: controlCabinet,
    title: 'PLC 控制柜',
    caption: 'DI/DO 状态正常 · 无故障位',
  },
  {
    id: 8,
    url: sensorGauge,
    title: '温度传感器 T04',
    caption: '量程 -20 ~ 120 °C · 4-20 mA',
  },
  {
    id: 9,
    url: nameplate,
    title: '设备铭牌与二维码',
    caption: 'EQ-2023-204 · 扫码报修',
  },
  {
    id: 10,
    url: inspection,
    title: '班组长现场点检',
    caption: '班前点检 12 项 · 手持终端确认',
  },
  {
    id: 11,
    url: firstArticle,
    title: '首件检验',
    caption: '公差 ±0.02 mm · 卡尺复核',
  },
  {
    id: 12,
    url: operatorPortrait,
    title: '当班操作工',
    caption: '工号 A-1042 · 机加工一班',
  },
]

/** 按序号循环取图，供瀑布流 / 轮播这类需要大量图片的示例使用 */
export const photoAt = (index: number) => galleryPhotos[index % galleryPhotos.length]

/** 只取车间场景图（不含人像），用于报警照片、轮播等场景 */
export const scenePhotos = galleryPhotos.filter((item) => item.id !== 12)
