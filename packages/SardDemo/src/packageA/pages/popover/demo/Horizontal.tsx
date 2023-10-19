import { Button, Popover, Toast } from 'sard'

export default () => {
  return (
    <Popover
      direction="horizontal"
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
        },
        {
          text: '选项3',
        },
      ]}
      reference={<Button>水平排列</Button>}
      onSelect={({ text }) => Toast.show(text)}
    />
  )
}
