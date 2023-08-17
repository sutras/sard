import { Icon, Search, Space } from 'sard-taro'

export default () => {
  return (
    <Space vertical>
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
          <Icon name="caret-down" color="var(--sar-gray-700)" size={14} />
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
    </Space>
  )
}
