import { NoticeBar, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
      <NoticeBar
        leftIconProps={{ prefix: 'demo-icon', name: 'bell', size: 16 }}
      >
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>

      <NoticeBar hideLeftIcon>
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>

      <NoticeBar leftIcon="消息">
        这是一条很长很长很长很长很长很长很长很长很长很长的公告！
      </NoticeBar>
    </Space>
  )
}
