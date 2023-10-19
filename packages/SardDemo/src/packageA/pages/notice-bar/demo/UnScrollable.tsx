import { NoticeBar, Space } from 'sard'

export default () => {
  return (
    <Space>
      <NoticeBar scrollable="never">这是一条公告！</NoticeBar>

      <NoticeBar scrollable="never">
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
