import { Icon, Rate, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <Rate
        defaultValue={2.5}
        allowHalf
        icon={<Icon prefix="demo-icon" name="heart-fill"></Icon>}
        voidIcon={<Icon prefix="demo-icon" name="heart"></Icon>}
      />

      <Rate defaultValue={2.5} allowHalf icon="好" voidIcon="好" />
    </Space>
  )
}
