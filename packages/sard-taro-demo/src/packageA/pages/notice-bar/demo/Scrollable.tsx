import { NoticeBar, Space } from 'sard-taro'

export default () => {
  return (
    <Space>
      <NoticeBar scrollable="always">这是一条公告！</NoticeBar>

      <NoticeBar scrollable="always">
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
