import { Avatar, Mesh } from 'sard-taro'

export default () => {
  return (
    <Mesh>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <Mesh.Item key={index}>
            <Avatar>{index}</Avatar>
          </Mesh.Item>
        ))}
    </Mesh>
  )
}
