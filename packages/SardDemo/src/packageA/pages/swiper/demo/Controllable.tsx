import { useState } from 'react'
import { Mesh, Swiper } from 'sard'
import { Text } from '@tarojs/components'

import '../index.scss'

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

  return (
    <>
      <Mesh columns={2} outlineVertical>
        <Mesh.Item clickable onClick={handlePrev}>
          <Text>prev</Text>
        </Mesh.Item>
        <Mesh.Item clickable onClick={handleNext}>
          <Text>next</Text>
        </Mesh.Item>
      </Mesh>

      <Swiper
        indicatorDots
        current={activeIndex}
        onChange={(event) => setActiveIndex(event.detail.current)}
      >
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
