import { Cell, Dialog } from 'sard-taro'

export default () => {
  return (
    <>
      <Dialog.Agent />

      <Cell.Group card>
        <Cell
          linkable
          title="显示提示框"
          onClick={() => {
            Dialog.alert({
              title: '提示',
              message: '此功能暂时无法使用',
            })
          }}
        />
        <Cell
          linkable
          title="显示确定框"
          onClick={() => {
            Dialog.confirm({
              title: '提示',
              message: '确定删除？',
            })
          }}
        />
      </Cell.Group>
    </>
  )
}