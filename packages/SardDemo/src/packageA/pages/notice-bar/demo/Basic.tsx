import { NoticeBar, Space } from 'sard'

export default () => {
  return (
    <Space>
      <NoticeBar>这是一条公告！</NoticeBar>

      <NoticeBar>
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
