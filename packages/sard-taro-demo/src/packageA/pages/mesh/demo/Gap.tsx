import { Mesh } from 'sard-taro'

export default () => {
  return (
    <>
      <Mesh columns={4} gap={10}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item
              key={index}
              text="文字"
              iconProps={{ name: 'image' }}
            ></Mesh.Item>
          ))}
      </Mesh>

      <Mesh columns={3} square gap={10} style={{ marginTop: 20 }}>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item
              key={index}
              text="文字"
              iconProps={{ name: 'image' }}
            ></Mesh.Item>
          ))}
      </Mesh>
    </>
  )
}
