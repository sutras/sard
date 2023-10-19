import { Button, Space } from 'sard'

export default () => {
  return (
    <Space direction="horizontal">
      <Button iconProps={{ name: 'close' }} />
      <Button type="pale" iconProps={{ name: 'plus' }} round />
      <Button type="mild" iconProps={{ name: 'minus' }} round />
      <Button type="outline" iconProps={{ name: 'search' }} round />
      <Button type="text" iconProps={{ name: 'left' }} round />
      <Button type="pale-text" iconProps={{ name: 'right' }} round />
    </Space>
  )
}
