import { Button, Popover, Toast } from 'sard-taro'

export default () => {
  return (
    <Popover
      options={[
        {
          text: '选项1',
          iconProps: {
            prefix: 'demo-icon',
            name: 'upc-scan',
          },
        },
        {
          text: '选项2',
          iconProps: {
            prefix: 'demo-icon',
            name: 'camera',
          },
        },
        {
          text: '选项3',
          iconProps: {
            prefix: 'demo-icon',
            name: 'bell',
          },
        },
      ]}
      reference={<Button>展示图标</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
