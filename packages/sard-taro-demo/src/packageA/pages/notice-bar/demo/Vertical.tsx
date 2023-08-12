import { NoticeBar, Swiper } from 'sard-taro'

export default () => {
  return (
    <NoticeBar scrollable={false}>
      <Swiper
        autoplay
        vertical
        interval={1500}
        circular
        style={{ height: '100%' }}
      >
        <Swiper.Item>1. 这是一条公告！</Swiper.Item>
        <Swiper.Item>2. 这是一条公告！</Swiper.Item>
        <Swiper.Item>3. 这是一条公告！</Swiper.Item>
      </Swiper>
    </NoticeBar>
  )
}
