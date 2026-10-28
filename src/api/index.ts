import { devicePhotoList } from '@/data/images'
import { plantTree, type PlantNode } from '@/data/plant-tree'
import { sleep } from 'sard'

function filter(
  list: {
    code: string
    name: string
  }[],
  name?: string,
) {
  return name
    ? list.filter((item) => {
        return item.name.includes(name)
      })
    : list
}

function paginate<T>(data: T[], page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize
  const result = data.slice(offset, offset + pageSize)
  return {
    list: result,
    total: data.length,
  }
}

interface Query {
  page?: number
  pageSize?: number
  name?: string
}

// ============================ 厂区 / 车间 / 产线 ============================
const collectLevel = (level: number) => {
  const result: { code: string; name: string }[] = []

  const walk = (nodes: PlantNode[], depth: number) => {
    for (const node of nodes) {
      if (depth === level) {
        result.push({ code: String(node.code), name: node.name })
      } else if (node.children) {
        walk(node.children, depth + 1)
      }
    }
  }

  walk(plantTree, 0)

  return result
}

export async function getPlants(query: Query = {}) {
  await sleep(400)
  return paginate(filter(collectLevel(0), query.name), query.page, query.pageSize)
}

export async function getWorkshops(query: Query = {}) {
  await sleep(400)
  return paginate(filter(collectLevel(1), query.name), query.page, query.pageSize)
}

export async function getLines(query: Query = {}) {
  await sleep(400)
  return paginate(filter(collectLevel(2), query.name), query.page, query.pageSize)
}

// ============================ 图片 ============================
export async function getImages(query: Query = {}) {
  await sleep(400)
  return paginate(devicePhotoList, query.page, query.pageSize)
}
