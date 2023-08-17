import { Button, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <Button style={{ background: 'var(--sar-pink)' }}>default</Button>
      <Button
        style={{
          background: 'rgba(var(--sar-pink-rgb), 0.2)',
          color: 'var(--sar-pink)',
        }}
        type="pale"
      >
        pale
      </Button>
      <Button style={{ color: 'var(--sar-pink)' }} type="mild">
        mild
      </Button>
      <Button style={{ color: 'var(--sar-pink)' }} type="outline">
        outline
      </Button>
      <Button style={{ color: 'var(--sar-pink)' }} type="text">
        text
      </Button>
      <Button style={{ color: 'var(--sar-pink)' }} type="pale-text">
        pale-text
      </Button>
      <Button
        style={{
          background:
            'linear-gradient(to right, var(--sar-indigo), var(--sar-pink))',
        }}
      >
        渐变色
      </Button>
    </Space>
  )
}
