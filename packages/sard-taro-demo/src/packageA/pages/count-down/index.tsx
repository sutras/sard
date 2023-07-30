import { useRef } from 'react'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { View } from '@tarojs/components'
import { CountDown, CountDownRef, Cell } from 'sard-taro'

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
            <View className="demo-time-wrap">
              <View className="demo-time">
                {String(time.hours).padStart(2, '0')}
              </View>
              <View className="demo-colon">:</View>
              <View className="demo-time">
                {String(time.minutes).padStart(2, '0')}
              </View>
              <View className="demo-colon">:</View>
              <View className="demo-time">
                {String(time.seconds).padStart(2, '0')}
              </View>
            </View>
          )}
        </CountDown>
      </Demo>

      <Demo title="手动控制" full>
        <Cell.Group card>
          <Cell>
            <CountDown
              ref={ref}
              time={1000 * 10}
              format="ss:SSS"
              interval={60}
              autoStart={false}
            />
          </Cell>
          <Cell
            title="开始"
            linkable
            onClick={() => ref.current?.start()}
          ></Cell>
          <Cell
            title="暂停"
            linkable
            onClick={() => ref.current?.pause()}
          ></Cell>
          <Cell
            title="重置"
            linkable
            onClick={() => ref.current?.reset()}
          ></Cell>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
