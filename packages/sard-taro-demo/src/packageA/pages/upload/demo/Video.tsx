import { Upload } from 'sard-taro'

export default () => {
  return (
    <Upload
      accept="video"
      defaultFileList={[
        {
          url: 'https://www.runoob.com/try/demo_source/movie.mp4',
        },
        {
          url: 'https://www.runoob.com/try/demo_source/movie.mp4',
        },
        {
          url: 'https://www.runoob.com/try/demo_source/movie.mp4',
        },
      ]}
    />
  )
}
