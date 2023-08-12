import { Toast, Upload } from 'sard-taro'

export default () => {
  return (
    <Upload
      maxSize={12 * 1024}
      overSize={() => {
        Toast.show('文件大小不能超过12KB')
      }}
    />
  )
}
