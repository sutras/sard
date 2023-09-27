import { Button, LinearGradient, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button style={{ backgroundColor: 'tomato' }}>default</Button>
      <Button
        style={{
          backgroundColor: '#f5f5f5',
        }}
        color="tomato"
        type="pale"
      >
        pale
      </Button>
      <Button color="tomato" type="mild">
        mild
      </Button>
      <Button color="tomato" type="outline">
        outline
      </Button>
      <Button color="tomato" type="text">
        text
      </Button>
      <Button color="tomato" type="pale-text">
        pale-text
      </Button>
      <Button
        before={
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['tomato', '#6f42c1']}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
        }
      >
        渐变色
      </Button>
    </Space>
  )
}
