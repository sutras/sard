import { Mesh, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="large">
      <Mesh columns={4} gap={10}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
          ))}
      </Mesh>

      <Mesh columns={3} square gap={10}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
          ))}
      </Mesh>
    </Space>
  )
}
