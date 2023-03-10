/*
### 基础使用
*/

import { useRef } from 'react'
import { Dropdown } from 'sard'

export default function () {
  const options1 = [
    {
      label: '距离优先',
      value: '1',
    },
    {
      label: '速度优先',
      value: '2',
    },
    {
      label: '评分优先',
      value: '3',
    },
  ]
  const options2 = [
    {
      label: '30分钟内',
      value: '1',
    },
    {
      label: '40分钟内',
      value: '2',
    },
    {
      label: '50分钟内',
      value: '3',
    },
  ]

  const ref1 = useRef(null)

  return (
    <>
      <Dropdown>
        <Dropdown.Item
          options={options1}
          defaultValue="1"
          ref={ref1}
        ></Dropdown.Item>
        <Dropdown.Item options={options2} defaultValue="2"></Dropdown.Item>
      </Dropdown>
    </>
  )
}
