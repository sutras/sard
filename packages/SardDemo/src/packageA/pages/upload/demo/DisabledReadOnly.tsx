import { Space, Upload } from 'sard'

export default () => {
  return (
    <Space>
      <Upload
        fileList={[
          {
            url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
          },
        ]}
        readOnly
      />

      <Upload
        fileList={[
          {
            url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
          },
        ]}
        disabled
      />
    </Space>
  )
}
