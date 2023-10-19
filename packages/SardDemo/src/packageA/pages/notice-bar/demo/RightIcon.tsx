import { NoticeBar } from 'sard'

export default () => {
  return (
    <NoticeBar
      closable
      onClose={() => console.log('close')}
      rightIconProps={{ name: 'x-circle-fill' }}
    >
      这是一条很长很长很长很长很长很长很长很长很长很长的公告！
    </NoticeBar>
  )
}
