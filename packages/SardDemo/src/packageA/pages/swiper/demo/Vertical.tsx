import { Swiper } from 'sard'
import { Text } from '@tarojs/components'

import '../index.scss'

export default () => {
  return (
    <Swiper indicatorDots vertical>
      <Swiper.Item className="demo-swiper-item demo-swiper-item1">
        <Text>item1</Text>
      </Swiper.Item>
      <Swiper.Item className="demo-swiper-item demo-swiper-item2">
        <Text>item2</Text>
      </Swiper.Item>
      <Swiper.Item className="demo-swiper-item demo-swiper-item3">
        <Text>item3</Text>
      </Swiper.Item>
    </Swiper>
  )
}
