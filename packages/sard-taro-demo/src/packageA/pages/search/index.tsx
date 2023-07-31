import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon, Search, Toast } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-search">
      <Toast />

      <Demo title="基础使用" full>
        <Search placeholder="请输入关键词" />
      </Demo>

      <Demo title="搜索按钮" full>
        <Search
          placeholder="请输入关键词"
          search="搜索"
          onSearch={Toast.show}
        />
      </Demo>

      <Demo title="取消按钮" full>
        <Search
          placeholder="请输入关键词"
          cancel="取消"
          onCancel={() => Toast.show('取消')}
        />
      </Demo>

      <Demo title="形状" full>
        <Search placeholder="请输入关键词" shape="round" />
      </Demo>

      <Demo title="对齐" full>
        <Search placeholder="请输入关键词" align="center" />
      </Demo>

      <Demo title="背景色" full>
        <Search
          placeholder="请输入关键词"
          background="var(--sar-danger)"
          inputBackground="#fff"
          shape="round"
        />
      </Demo>

      <Demo title="禁用" full>
        <Search placeholder="请输入关键词" disabled />
      </Demo>

      <Demo title="只读" full>
        <Search placeholder="请输入关键词" readOnly />
      </Demo>

      <Demo title="插槽" full>
        <Search
          placeholder="请输入关键词"
          shape="round"
          prepend={
            <Icon
              prefix="demo-icon"
              name="upc-scan"
              style={{ marginLeft: 5, marginRight: 17 }}
            />
          }
          inputPrepend={
            <Icon
              name="caret-down-fill"
              color="var(--sar-gray-700)"
              size={14}
            />
          }
          inputAppend={<Icon prefix="demo-icon" name="camera" size={20} />}
        />

        <Search
          style={{ marginTop: 20 }}
          placeholder="请输入关键词"
          shape="round"
          prepend={<Icon name="left" size={18} style={{ marginRight: 12 }} />}
          append={
            <Icon
              prefix="demo-icon"
              name="list-task"
              size={20}
              style={{ marginLeft: 10 }}
            />
          }
        />
      </Demo>
    </Page>
  )
}
