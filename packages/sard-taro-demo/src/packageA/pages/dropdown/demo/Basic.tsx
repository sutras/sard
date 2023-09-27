import { Dropdown } from 'sard-taro'

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
      <Dropdown.Item options={options1} defaultValue="1" />
      <Dropdown.Item options={options2} defaultValue="2" />
    </Dropdown>
  )
}
