import { View } from '@tarojs/components'
import { Icon, Upload } from 'sard-taro'

export default () => {
  return (
    <Upload
      select={
        <>
          <Icon
            style={{ fontSize: 20 }}
            prefix="demo-icon"
            name="camera"
          ></Icon>
          <View style={{ fontSize: 12, marginTop: 5 }}>上传图片</View>
        </>
      }
    />
  )
}
