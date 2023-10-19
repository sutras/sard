import { Button, Space } from 'sard'

export default () => {
  return (
    <Space>
      <Button type="default">默认</Button>
      <Button type="pale">淡颜色</Button>
      <Button type="mild">温和</Button>
      <Button type="outline">轮廓线</Button>
      <Button type="text">文本</Button>
      <Button type="pale-text">淡文本</Button>
    </Space>
  )
}
