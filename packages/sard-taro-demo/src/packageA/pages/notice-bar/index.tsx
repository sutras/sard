import Demo from '@/components/demo'
import Page from '@/components/page'
import { NoticeBar, Swiper } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-notice-bar">
      <Demo title="基础使用">
        <NoticeBar>这是一条公告！</NoticeBar>

        <NoticeBar>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="强制滚动">
        <NoticeBar scrollable>这是一条公告！</NoticeBar>

        <NoticeBar scrollable>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="强制不滚动">
        <NoticeBar scrollable={false}>这是一条公告！</NoticeBar>

        <NoticeBar scrollable={false}>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="多行展示">
        <NoticeBar wrap>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="自定义左边图标">
        <NoticeBar
          leftIconProps={{ prefix: 'demo-icon', name: 'bell', size: 16 }}
        >
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>

        <NoticeBar leftIcon="">
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>

        <NoticeBar leftIcon="消息">
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="可关闭的">
        <NoticeBar closable onClose={() => console.log('close')}>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="可点击的">
        <NoticeBar linkable onClick={() => console.log('click')}>
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="自定义右边图标">
        <NoticeBar
          closable
          onClose={() => console.log('close')}
          rightIconProps={{ name: 'x-circle-fill' }}
        >
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="自定义样式">
        <NoticeBar
          color="var(--sar-primary)"
          background="rgba(var(--sar-primary-rgb), 0.1)"
        >
          这是一条很长很长很长很长很长很长很长很长很长很长的公告！
        </NoticeBar>
      </Demo>

      <Demo title="垂直滚动">
        <NoticeBar scrollable={false}>
          <Swiper
            autoplay
            vertical
            interval={1500}
            circular
            style={{ height: '100%' }}
          >
            <Swiper.Item>1. 这是一条公告！</Swiper.Item>
            <Swiper.Item>2. 这是一条公告！</Swiper.Item>
            <Swiper.Item>3. 这是一条公告！</Swiper.Item>
          </Swiper>
        </NoticeBar>
      </Demo>
    </Page>
  )
}
