import { Text, View } from '@tarojs/components'
import { NoticeBar, Swiper } from 'sard'

export default () => {
  return (
    <NoticeBar vertical>
      <Swiper
        autoplay
        vertical
        interval={1500}
        circular
        style={{
          height: 40,
        }}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return (
              <Swiper.Item key={i}>
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={{ color: 'black' }}>{`${
                    i + 1
                  }. 这是一条公告！`}</Text>
                </View>
              </Swiper.Item>
            )
          })}
      </Swiper>
    </NoticeBar>
  )
}
