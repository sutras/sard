import { useState } from 'react'
import { Cell, Slider, Swiper } from 'sard-taro'

export default () => {
  const [interval, setInterval$] = useState(2000)
  const [duration, setDuration] = useState(500)

  return (
    <>
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
    </>
  )
}
