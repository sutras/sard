import { NoticeBar, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <NoticeBar>这是一条公告！</NoticeBar>

      <NoticeBar>
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
