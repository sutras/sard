import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon, Toast, Upload, UploadFileItem } from 'sard-taro'
import { useState } from 'react'
import { View } from '@tarojs/components'

import './index.scss'
import pic1 from '@/static/pic1.jpg'
import pic2 from '@/static/pic2.jpg'
import pic3 from '@/static/pic3.jpg'

export default () => {
  const handleAfterRead = (fileItem: UploadFileItem) => {
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setList((list) => [...list])

    setTimeout(() => {
      fileItem.status = 'done'
      setList((list) => [...list])
    }, 1500)
  }

  const [list, setList] = useState<UploadFileItem[]>(() => [
    {
      url: pic1,
    },
    {
      url: pic2,
      status: 'uploading',
      message: '正在上传',
    },
    {
      url: pic3,
      status: 'failed',
      message: '上传失败',
    },
  ])

  return (
    <Page className="page-upload">
      <Toast.Agent />

      <Demo title="基础使用">
        <Upload />
      </Demo>

      <Demo title="上传视频">
        <Upload accept="video" />
      </Demo>

      <Demo title="限定上传数量">
        <Upload maxCount={3} />
      </Demo>

      <Demo title="多选">
        <Upload multiple maxCount={6} />
      </Demo>

      <Demo title="上传前置处理">
        <Upload
          beforeRead={(file) => {
            console.log(file)
            if (file.path) {
              Toast.show('这里可以阻止文件选择')
              return false
            }
            return true
          }}
        />
      </Demo>

      <Demo title="限定上传大小">
        <Upload
          maxSize={12 * 1024}
          overSize={() => {
            Toast.show('文件大小不能超过12KB')
          }}
        />
      </Demo>

      <Demo title="上传状态">
        <Upload
          fileList={list}
          onChange={setList}
          afterRead={handleAfterRead}
        />
      </Demo>

      <Demo title="禁用">
        <Upload
          fileList={[
            {
              url: pic1,
            },
          ]}
          disabled
        />
      </Demo>

      <Demo title="只读">
        <Upload
          fileList={[
            {
              url: pic1,
            },
          ]}
          readOnly
        />
      </Demo>

      <Demo title="自定义选区样式">
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
      </Demo>
    </Page>
  )
}
