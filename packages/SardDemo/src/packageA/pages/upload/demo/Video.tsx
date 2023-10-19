import { Upload } from 'sard'

export default () => {
  return (
    <Upload
      accept="video"
      defaultFileList={[
        {
          url: 'https://unpkg.com/@sard/assets@1.2.0/video/video1.mp4',
        },
        {
          url: 'https://unpkg.com/@sard/assets@1.2.0/video/video1.mp4',
        },
        {
          url: 'https://unpkg.com/@sard/assets@1.2.0/video/video1.mp4',
        },
      ]}
    />
  )
}
