import { Mesh } from 'sard-taro'

export default () => {
  return (
    <Mesh border={false}>
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
  )
}
