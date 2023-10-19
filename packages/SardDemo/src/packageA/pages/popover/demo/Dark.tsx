import { Button, Popover, Toast } from 'sard'

export default () => {
  return (
    <Popover
      theme="dark"
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
      reference={<Button>自定义颜色</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
