import { Swiper } from 'sard-taro'

export default () => {
  return (
    <Swiper className="demo-swiper" indicatorDots>
      <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
      <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
      <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
    </Swiper>
  )
}
