import { useState } from 'react'
import { List, Slider, Swiper } from 'sard'
import { Text } from '@tarojs/components'

import '../index.scss'

export default () => {
  const [interval, setInterval$] = useState(2000)
  const [duration, setDuration] = useState(500)

  return (
    <>
      <List>
        <List.Item>
          <Text>duration: {duration}</Text>
        </List.Item>
        <List.Item>
          <Slider
            min={500}
            max={2000}
            value={duration}
            onChange={(value: number) => setDuration(value)}
          />
        </List.Item>
        <List.Item>
          <Text>interval: {interval}</Text>
        </List.Item>
        <List.Item>
          <Slider
            min={2000}
            max={8000}
            value={interval}
            onChange={(value: number) => setInterval$(value)}
          />
        </List.Item>
      </List>
      <Swiper autoplay duration={duration} interval={interval} indicatorDots>
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
    </>
  )
}
