import Demo from '@/components/demo'
import Page from '@/components/page'
import { Button, Slider, Swiper } from 'sard-taro'

import './index.scss'
import { useState } from 'react'
import { View } from '@tarojs/components'

export default () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const handlePrev = () => {
    setActiveIndex((activeIndex) => {
      return activeIndex <= 0 ? 2 : --activeIndex
    })
  }

  const handleNext = () => {
    setActiveIndex((activeIndex) => {
      return activeIndex >= 2 ? 0 : ++activeIndex
    })
  }

  const [interval, setInterval$] = useState(2000)
  const [duration, setDuration] = useState(500)

  return (
    <Page className="page-swiper">
      <Demo title="基础使用">
        <Swiper className="demo-swiper" indicatorDots>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="受控">
        <Button onClick={handlePrev}>prev</Button>
        <Button onClick={handleNext}>next</Button>
        <Swiper
          indicatorDots
          className="demo-swiper"
          current={activeIndex}
          onChange={(event) => setActiveIndex(event.detail.current)}
        >
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="垂直">
        <Swiper className="demo-swiper" indicatorDots vertical>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="自动播放">
        <View>
          <View>duration: {duration}</View>
          <Slider
            min={500}
            max={2000}
            value={duration}
            onChange={(value: number) => setDuration(value)}
          />
        </View>
        <View style={{ marginBottom: 5 }}>
          <View>interval: {interval}</View>
          <Slider
            min={2000}
            max={8000}
            value={interval}
            onChange={(value: number) => setInterval$(value)}
          />
        </View>
        <Swiper
          className="demo-swiper"
          autoplay
          duration={duration}
          interval={interval}
          indicatorDots
        >
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="循环滑动">
        <Swiper className="demo-swiper" indicatorDots circular>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>
    </Page>
  )
}
