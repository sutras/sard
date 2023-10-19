import { Mesh, Space } from 'sard'

export default () => {
  return (
    <Space gap="large">
      <Mesh direction="horizontal" reverse>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
          ))}
      </Mesh>

      <Mesh direction="vertical" reverse>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
          ))}
      </Mesh>
    </Space>
  )
}
