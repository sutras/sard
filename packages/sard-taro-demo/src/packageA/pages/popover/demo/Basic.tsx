import { Button, Popover, Toast } from 'sard-taro'

export default () => {
  return (
    <Popover
      options={[
        {
          text: '选项1',
        },
        {
          text: '选项2',
        },
        {
          text: '选项3',
        },
      ]}
      reference={<Button>基础使用</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
