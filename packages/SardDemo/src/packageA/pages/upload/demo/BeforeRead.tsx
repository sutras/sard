import { Toast, Upload } from 'sard'

export default () => {
  return (
    <Upload
      beforeRead={(file) => {
        if (file.path) {
          Toast.show('这里可以阻止文件选择')
          return false
        }
        return true
      }}
    />
  )
}
