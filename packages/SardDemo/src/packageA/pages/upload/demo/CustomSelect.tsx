import { View } from '@tarojs/components'
import { Icon, Upload } from 'sard'

export default () => {
  return (
    <Upload
      select={
        <>
          <Icon size={20} family="demo-icons" name="camera" />
          <View style={{ fontSize: 12, marginTop: 4 }}>上传图片</View>
        </>
      }
    />
  )
}
