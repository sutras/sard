import { Mesh } from 'sard'

export default () => {
  return (
    <Mesh columns={3}>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <Mesh.Item key={index} text="文字" iconProps={{ name: 'image' }} />
        ))}
    </Mesh>
  )
}
