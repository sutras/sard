import { useRef } from 'react'
import { CountDown, CountDownRef, Mesh, Space } from 'sard'

export default () => {
  const ref = useRef<CountDownRef>(null)

  return (
    <Space>
      <Mesh clickable columns={3}>
        <Mesh.Item
          onClick={() => ref.current?.start()}
          iconProps={{ family: 'demo-icons', name: 'play-circle' }}
          text="开始"
        />
        <Mesh.Item
          onClick={() => ref.current?.pause()}
          iconProps={{ family: 'demo-icons', name: 'pause-circle' }}
          text="暂停"
        />
        <Mesh.Item
          onClick={() => ref.current?.reset()}
          iconProps={{ family: 'demo-icons', name: 'arrow-clockwise' }}
          text="重置"
        />
      </Mesh>

      <CountDown
        ref={ref}
        time={1000 * 10}
        format="ss:SSS"
        interval={60}
        autoStart={false}
      />
    </Space>
  )
}
