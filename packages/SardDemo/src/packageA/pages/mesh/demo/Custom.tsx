import { Avatar, Mesh } from 'sard'

export default () => {
  return (
    <Mesh>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <Mesh.Item key={index}>
            <Avatar>{index}</Avatar>
          </Mesh.Item>
        ))}
    </Mesh>
  )
}
