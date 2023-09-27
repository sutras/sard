import { Rate, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Rate
        defaultValue={2.5}
        allowHalf
        iconProps={{
          family: 'demo-icons',
          name: 'heart-fill',
        }}
        voidIconProps={{
          family: 'demo-icons',
          name: 'heart',
        }}
      />

      <Rate defaultValue={2.5} allowHalf icon="好" voidIcon="好" />
    </Space>
  )
}
