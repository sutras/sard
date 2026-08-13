<template>
  <s-table bordered :columns="columns" :data="data" :span-method="spanMethod"></s-table>
</template>

<script setup lang="ts">
const columns = [
  { label: 'ID', prop: 'id', width: 60 },
  { label: '日期', prop: 'date', width: 120 },
  { label: '姓名', prop: 'name', width: 80 },
  { label: '城市', prop: 'city', width: 80 },
  { label: '电话', prop: 'tel', width: 120 },
  { label: '地址', prop: 'address', width: 180 },
]

const data = [
  {
    id: 1,
    date: '2024-01-01',
    name: '张三',
    city: '广州',
    tel: '13800001111',
    address: '天河区**路1号',
  },
  {
    id: 1,
    date: '2024-01-01',
    name: '张三',
    city: '广州',
    tel: '13800002222',
    address: '天河区**路1号',
  },
  {
    id: 2,
    date: '2024-01-02',
    name: '李四',
    city: '深圳',
    tel: '13900001111',
    address: '南山区**路2号',
  },
  {
    id: 2,
    date: '2024-01-02',
    name: '李四',
    city: '深圳',
    tel: '13900002222',
    address: '南山区**路2号',
  },
  {
    id: 3,
    date: '2024-01-03',
    name: '王五',
    city: '北京',
    tel: '13700001111',
    address: '朝阳区**路3号',
  },
  {
    id: 4,
    date: '2024-01-04',
    name: '赵六',
    city: '上海',
    tel: '13600001111',
    address: '浦东新区**路4号',
  },
]

const spanMethod = ({ row, rowIndex, columnIndex }: any) => {
  if (columnIndex === 3) {
    if (rowIndex > 0 && data[rowIndex - 1].city === row.city) {
      return { rowspan: 0, colspan: 0 }
    }
    let rowspan = 1
    while (rowIndex + rowspan < data.length && data[rowIndex + rowspan].city === row.city) {
      rowspan++
    }
    return { rowspan, colspan: 1 }
  }
}
</script>
