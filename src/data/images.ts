import { galleryPhotos } from './industrial-images'

/** 模拟 MES 附件列表（设备照片 / 报警现场图），字段与 getImages 接口一致 */
export const devicePhotoList = galleryPhotos.map((item) => ({
  id: item.id,
  url: item.url,
  title: item.title,
}))
