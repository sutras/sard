import type { TableColumnProps } from 'sard'

export const columns: TableColumnProps[] = [
  {
    label: 'ID',
    prop: 'id',
    width: 40,
    fixed: 'start',
  },
  {
    label: '日期',
    prop: 'date',
    width: 100,
  },
  {
    label: '姓名',
    prop: 'name',
    width: 80,
  },
  {
    label: '城市',
    prop: 'city',
    width: 80,
  },
  {
    label: '电话',
    prop: 'tel',
    width: 100,
  },
  {
    label: '地址',
    prop: 'address',
    width: 200,
  },
]

export const multiColumns: TableColumnProps[] = [
  {
    label: 'ID',
    prop: 'id',
    width: 40,
    fixed: 'start',
  },
  {
    label: '日期',
    prop: 'date',
    width: 100,
  },
  {
    label: '收货地址',
    columns: [
      {
        label: '姓名',
        prop: 'name',
        width: 80,
      },
      {
        label: '地址信息',
        columns: [
          {
            label: '城市',
            prop: 'city',
            width: 80,
          },
          {
            label: '电话',
            prop: 'tel',
            width: 100,
          },
          {
            label: '地址',
            prop: 'address',
            width: 200,
          },
        ],
      },
    ],
  },
  {
    label: '操作',
    prop: 'action',
    width: 80,
    fixed: 'end',
    slot: 'action',
  },
]

export const partialColumns = [
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '城市',
    prop: 'city',
  },
]

export const data = Array(20)
  .fill(0)
  .map((_, i) => {
    return {
      id: i + 1,
      name: '张三',
      city: '广州',
      tel: '138********',
      address: '广东省广州市**路22号',
      date: '2024-12-12',
    }
  })

export const partialData = data.slice(0, 4)
