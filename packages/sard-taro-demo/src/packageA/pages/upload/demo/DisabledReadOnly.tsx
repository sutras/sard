import { Space, Upload } from 'sard-taro'

import pic1 from '@/static/pic1.jpg'

export default () => {
  return (
    <Space>
      <Upload
        fileList={[
          {
            url: pic1,
          },
        ]}
        disabled
      />

      <Upload
        fileList={[
          {
            url: pic1,
          },
        ]}
        readOnly
      />
    </Space>
  )
}
