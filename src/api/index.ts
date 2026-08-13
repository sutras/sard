import { tigerAndCatList } from '@/data/images'
import { mapCities, mapCounties, mapProvinces } from 'region-data'
import { sleep } from 'sard'

function mapToList<T extends Record<number, string>>(map: T) {
  return Object.entries(map).map((item) => {
    return {
      code: item[0],
      name: item[1],
    }
  })
}

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

// ============================ 省市区 ============================
export async function getProvinces(query: Query = {}) {
  await sleep(400)
  return paginate(filter(mapToList(mapProvinces), query.name), query.page, query.pageSize)
}

export async function getCities(query: Query = {}) {
  await sleep(400)
  return paginate(filter(mapToList(mapCities), query.name), query.page, query.pageSize)
}

export async function getCounties(query: Query = {}) {
  await sleep(400)
  return paginate(filter(mapToList(mapCounties), query.name), query.page, query.pageSize)
}

// ============================ 图片 ============================
export async function getImages(query: Query = {}) {
  await sleep(400)
  return paginate(tigerAndCatList, query.page, query.pageSize)
}
