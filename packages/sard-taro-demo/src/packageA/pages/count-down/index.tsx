import { useRef } from 'react'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { View } from '@tarojs/components'
import { CountDown, Button, CountDownRef } from 'sard-taro'

import './index.scss'

export default () => {
  const ref = useRef<CountDownRef>(null)

  return (
    <Page className="page-count-down">
      <Demo title="基础使用">
        <CountDown time={1000 * 60 * 60 * 2} />
      </Demo>

      <Demo title="自定义格式">
        <CountDown time={1000 * 60 * 60 * 2} format="HH 时 mm 分 ss 秒" />
      </Demo>

      <Demo title="毫秒级别的渲染">
        <CountDown
          time={1000 * 60 * 60 * 2}
          format="HH 时 mm 分 ss 秒 SSS 毫秒"
          interval={93}
        />
      </Demo>

      <Demo title="自定义样式">
        <CountDown time={1000 * 60 * 60 * 2} interval={93}>
          {(time) => (
            <View className="time-wrap">
              <View className="time">
                {String(time.hours).padStart(2, '0')}
              </View>
              <View className="colon">:</View>
              <View className="time">
                {String(time.minutes).padStart(2, '0')}
              </View>
              <View className="colon">:</View>
              <View className="time">
                {String(time.seconds).padStart(2, '0')}
              </View>
            </View>
          )}
        </CountDown>
      </Demo>

      <Demo title="手动控制">
        <Button onClick={() => ref.current?.start()}>开始</Button>
        <Button onClick={() => ref.current?.pause()}>暂停</Button>
        <Button onClick={() => ref.current?.reset()}>重置</Button>
        <CountDown
          ref={ref}
          time={1000 * 10}
          format="ss:SSS"
          interval={60}
          autoStart={false}
        />
      </Demo>
    </Page>
  )
}
