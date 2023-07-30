import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Slider, Swiper } from 'sard-taro'

import './index.scss'
import { useState } from 'react'

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
      <Demo title="基础使用" full>
        <Swiper className="demo-swiper" indicatorDots>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="受控" full>
        <Cell.Group>
          <Cell title="prev" linkable onClick={handlePrev}></Cell>
          <Cell title="next" linkable onClick={handleNext}></Cell>
        </Cell.Group>
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

      <Demo title="垂直" full>
        <Swiper className="demo-swiper" indicatorDots vertical>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>

      <Demo title="自动播放" full>
        <Cell.Group>
          <Cell>duration: {duration}</Cell>
          <Cell>
            <Slider
              min={500}
              max={2000}
              value={duration}
              onChange={(value: number) => setDuration(value)}
            />
          </Cell>
          <Cell>interval: {interval}</Cell>
          <Cell>
            <Slider
              min={2000}
              max={8000}
              value={interval}
              onChange={(value: number) => setInterval$(value)}
            />
          </Cell>
        </Cell.Group>
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

      <Demo title="循环滑动" full>
        <Swiper className="demo-swiper" indicatorDots circular>
          <Swiper.Item className="demo-item demo-item1">item1</Swiper.Item>
          <Swiper.Item className="demo-item demo-item2">item2</Swiper.Item>
          <Swiper.Item className="demo-item demo-item3">item3</Swiper.Item>
        </Swiper>
      </Demo>
    </Page>
  )
}
