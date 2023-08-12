import { useState } from 'react'
import { Mesh, Swiper } from 'sard-taro'

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
          prev
        </Mesh.Item>
        <Mesh.Item clickable onClick={handleNext}>
          next
        </Mesh.Item>
      </Mesh>

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
    </>
  )
}
