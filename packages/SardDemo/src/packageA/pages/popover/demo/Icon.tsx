import { Button, Popover, Toast } from 'sard'

export default () => {
  return (
    <Popover
      theme="dark"
      options={[
        {
          text: '选项1',
          iconProps: {
            family: 'demo-icons',
            name: 'upc-scan',
          },
        },
        {
          text: '选项2',
          iconProps: {
            family: 'demo-icons',
            name: 'camera',
          },
        },
        {
          text: '选项3',
          iconProps: {
            family: 'demo-icons',
            name: 'bell',
          },
        },
      ]}
      reference={<Button>展示图标</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
