import { Mesh } from 'sard'

export default () => {
  return (
    <Mesh direction="horizontal">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
        ))}
    </Mesh>
  )
}
