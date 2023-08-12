import { NoticeBar } from 'sard-taro'

export default () => {
  return (
    <NoticeBar linkable onClick={() => console.log('click')}>
      这是一条很长很长很长很长很长很长很长很长很长很长的公告！
    </NoticeBar>
  )
}
