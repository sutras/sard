import { NoticeBar } from 'sard-taro'

export default () => {
  return (
    <NoticeBar closable onClose={() => console.log('close')}>
      这是一条很长很长很长很长很长很长很长很长很长很长的公告！
    </NoticeBar>
  )
}
