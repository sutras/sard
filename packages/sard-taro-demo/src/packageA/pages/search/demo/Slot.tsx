import { Button, Search, Space } from 'sard-taro'

export default () => {
  return (
    <Space gap="medium">
      <Search
        placeholder="请输入关键词"
        shape="round"
        prepend={
          <Button
            type="pale-text"
            size="small"
            theme="secondary"
            style={{ marginRight: 6 }}
            iconProps={{
              family: 'demo-icons',
              name: 'upc-scan',
              size: 16,
            }}
          />
        }
        inputPrepend={
          <Button
            type="pale-text"
            size="mini"
            theme="secondary"
            iconProps={{
              name: 'caret-down',
              size: 14,
            }}
          />
        }
        inputAppend={
          <Button
            type="pale-text"
            size="mini"
            theme="secondary"
            iconProps={{
              family: 'demo-icons',
              name: 'camera',
              size: 18,
            }}
          />
        }
      />

      <Search
        placeholder="请输入关键词"
        shape="round"
        prepend={
          <Button
            type="pale-text"
            size="small"
            theme="secondary"
            style={{ marginRight: 6 }}
            iconProps={{
              name: 'left',
              size: 16,
            }}
          />
        }
        append={
          <Button
            type="pale-text"
            size="small"
            theme="secondary"
            style={{ marginLeft: 6 }}
            iconProps={{
              family: 'demo-icons',
              name: 'list-task',
              size: 20,
            }}
          />
        }
      />
    </Space>
  )
}
