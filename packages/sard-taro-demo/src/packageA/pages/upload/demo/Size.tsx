import { Toast, Upload } from 'sard-taro'

export default () => {
  return (
    <Upload
      maxSize={1 * 1024}
      overSize={(fileItem) => {
        console.log(fileItem)
        Toast.show('文件大小不能超过1KB')
      }}
    />
  )
}
