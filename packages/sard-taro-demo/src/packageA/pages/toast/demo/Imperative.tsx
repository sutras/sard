import { Cell, Toast } from 'sard-taro'

export default () => {
  return (
    <>
      <Toast.Agent />

      <Cell.Group card>
        <Cell
          linkable
          title="文本提示"
          onClick={() => Toast.show('文本提示')}
        />
        <Cell linkable title="成功提示" onClick={() => Toast.success('成功')} />
        <Cell linkable title="失败提示" onClick={() => Toast.fail('失败')} />
        <Cell
          linkable
          title="加载中提示"
          onClick={() => Toast.loading('加载中')}
        />
        <Cell linkable title="隐藏提示" onClick={() => Toast.hide()} />
      </Cell.Group>
    </>
  )
}
