import { Cell, Dialog } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="done 回调异步关闭"
        onClick={() => {
          Dialog.confirm({
            title: '提示',
            message: '确定删除？',
            beforeClose: (done, type) => {
              if (type === 'confirm') {
                setTimeout(() => {
                  done()
                }, 1000)
              } else {
                done()
              }
            },
          })
        }}
      />
      <Cell
        linkable
        title="Promise 异步关闭"
        onClick={() => {
          Dialog.confirm({
            title: '提示',
            message: '确定删除？',
            beforeClose: (_, type) => {
              return new Promise<void>((resolve) => {
                if (type === 'confirm') {
                  setTimeout(() => {
                    resolve()
                  }, 1000)
                } else {
                  resolve()
                }
              })
            },
          })
        }}
      />
    </Cell.Group>
  )
}
