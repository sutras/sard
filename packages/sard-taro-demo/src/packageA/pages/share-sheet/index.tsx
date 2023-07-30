import Demo from '@/components/demo'
import Page from '@/components/page'
import {
  Cell,
  ShareSheet,
  ShareSheetItemList,
  ShareSheetItemProps,
  Toast,
} from 'sard-taro'
import { useState } from 'react'

import './index.scss'
import pic1 from '@/static/pic1.jpg'

export default () => {
  const [visible, setVisible] = useState(false)
  const itemList: ShareSheetItemList = [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        prefix: 'demo-icon',
        name: 'wechat-fill',
      },
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      icon: {
        prefix: 'demo-icon',
        name: 'alipay-fill',
      },
    },
    {
      name: 'Twitter',
      color: '#fff',
      background: '#1d9bf0',
      icon: {
        prefix: 'demo-icon',
        name: 'twitter-fill',
      },
    },
    {
      name: 'Facebook',
      color: '#fff',
      background: '#1877f2',
      icon: {
        prefix: 'demo-icon',
        name: 'facebook-circle-fill',
      },
    },
  ]

  const [visible2, setVisible2] = useState(false)
  const itemList2: ShareSheetItemList = [
    itemList,
    [
      {
        name: 'Spotify',
        color: '#fff',
        background: '#1ed760',
        icon: {
          prefix: 'demo-icon',
          name: 'spotify-fill',
        },
      },
      {
        name: 'Skype',
        color: '#fff',
        background: '#0b64a4',
        icon: {
          prefix: 'demo-icon',
          name: 'skype-fill',
        },
      },
      {
        name: 'Youtube',
        color: '#fff',
        background: '#ff0000',
        icon: {
          prefix: 'demo-icon',
          name: 'youtube-fill',
        },
      },
      {
        name: 'Paypal',
        color: '#fff',
        background: '#0070ba',
        icon: {
          prefix: 'demo-icon',
          name: 'paypal-fill',
        },
      },
      {
        name: 'Whatsapp',
        color: '#fff',
        background: '#128c7e',
        icon: {
          prefix: 'demo-icon',
          name: 'whatsapp-fill',
        },
      },
      {
        name: 'Telegram',
        color: '#fff',
        background: '#0088cc',
        icon: {
          prefix: 'demo-icon',
          name: 'telegram-fill',
        },
      },
      {
        name: 'Snapchat',
        color: '#000',
        background: '#fffc00',
        icon: {
          prefix: 'demo-icon',
          name: 'snapchat-fill',
        },
      },
    ],
  ]

  const [visible3, setVisible3] = useState(false)

  const itemList4: ShareSheetItemList = [
    {
      name: 'Sard',
      icon: pic1,
    },
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        prefix: 'demo-icon',
        name: 'wechat-fill',
      },
    },
  ]
  const [visible4, setVisible4] = useState(false)

  const itemList5: ShareSheetItemList = [
    {
      name: 'Wechat',
      color: '#fff',
      background: '#0bc15f',
      icon: {
        prefix: 'demo-icon',
        name: 'wechat-fill',
      },
      disabled: true,
    },
    {
      name: 'Alipay',
      color: '#fff',
      background: '#1677ff',
      icon: {
        prefix: 'demo-icon',
        name: 'alipay-fill',
      },
    },
  ]
  const [visible5, setVisible5] = useState(false)

  const handleSelect = (item: ShareSheetItemProps) => {
    Toast.show(item.name)
  }

  const [visible6, setVisible6] = useState(false)

  return (
    <Page className="page-share-sheet">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible(true)}
          />
        </Cell.Group>

        <ShareSheet
          visible={visible}
          itemList={itemList}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible}
        />
      </Demo>

      <Demo title="多行" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible2(true)}
          />
        </Cell.Group>

        <ShareSheet
          title="分享到"
          visible={visible2}
          itemList={itemList2}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible2}
        />
      </Demo>

      <Demo title="描述" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible3(true)}
          />
        </Cell.Group>

        <ShareSheet
          visible={visible3}
          itemList={itemList}
          title="分享到"
          description="这是描述"
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible3}
        />
      </Demo>

      <Demo title="图片类型图标" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible4(true)}
          />
        </Cell.Group>

        <ShareSheet
          visible={visible4}
          itemList={itemList4}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible4}
        />
      </Demo>

      <Demo title="禁用" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible5(true)}
          />
        </Cell.Group>

        <ShareSheet
          visible={visible5}
          itemList={itemList5}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible5}
        />
      </Demo>

      <Demo title="手动声明项目组件" full>
        <Cell.Group card>
          <Cell
            linkable
            title="显示分享面板"
            onClick={() => setVisible6(true)}
          />
        </Cell.Group>

        <ShareSheet
          visible={visible6}
          cancel="取消"
          actionClosable
          onSelect={handleSelect}
          onClose={setVisible6}
        >
          <ShareSheet.Row>
            <ShareSheet.Item
              name="Wechat"
              color="#fff"
              background="#0bc15f"
              icon={{
                prefix: 'demo-icon',
                name: 'wechat-fill',
              }}
            />
            <ShareSheet.Item
              name="Alipay"
              color="#fff"
              background="#1677ff"
              icon={{
                prefix: 'demo-icon',
                name: 'alipay-fill',
              }}
            />
          </ShareSheet.Row>
        </ShareSheet>
      </Demo>
    </Page>
  )
}
