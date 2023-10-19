import { Dropdown } from 'sard'

export default () => {
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

  return (
    <Dropdown>
      <Dropdown.Item label="排序" options={options1} />
      <Dropdown.Item label="速度" options={options2} defaultValue="2" />
    </Dropdown>
  )
}
