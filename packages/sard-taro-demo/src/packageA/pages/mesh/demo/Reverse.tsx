import { Mesh } from 'sard-taro'

export default () => {
  return (
    <>
      <Mesh direction="horizontal" reverse>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item
              key={index}
              text="文字"
              iconProps={{ name: 'image' }}
            ></Mesh.Item>
          ))}
      </Mesh>

      <Mesh direction="vertical" reverse style={{ marginTop: 20 }}>
        {Array(4)
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
