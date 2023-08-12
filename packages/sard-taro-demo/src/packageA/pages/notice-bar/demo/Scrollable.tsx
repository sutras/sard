import { NoticeBar, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <NoticeBar scrollable>这是一条公告！</NoticeBar>

      <NoticeBar scrollable>
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
