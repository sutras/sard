import { Button, Popover, Toast } from 'sard-taro'

export default () => {
  return (
    <Popover
      options={[
        {
          text: '选项1',
          disabled: true,
        },
        {
          text: '选项2',
          disabled: true,
        },
        {
          text: '选项3',
        },
      ]}
      reference={<Button>禁用选项</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
