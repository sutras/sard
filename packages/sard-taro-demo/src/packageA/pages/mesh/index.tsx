import Demo from '@/components/demo'
import Page from '@/components/page'
import { Avatar, Mesh } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-mesh">
      <Demo title="基础使用" full>
        <Mesh>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="隐藏边框" full>
        <Mesh border={false}>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="自定义列数" full>
        <Mesh columns={3}>
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="正方形格子" full>
        <Mesh columns={3} square>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="格子间距">
        <Mesh columns={4} gap="10px">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="内容横排" full>
        <Mesh direction="horizontal">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="内容翻转" full>
        <Mesh direction="horizontal" reverse>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>

        <Mesh direction="vertical" reverse>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="可点击的" full>
        <Mesh clickable>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item
                key={index}
                text="文字"
                iconProps={{ name: 'image' }}
              ></Mesh.Item>
            ))}
        </Mesh>
      </Demo>

      <Demo title="自定义内容" full>
        <Mesh>
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <Mesh.Item key={index}>
                <Avatar>{index}</Avatar>
              </Mesh.Item>
            ))}
        </Mesh>
      </Demo>
    </Page>
  )
}
