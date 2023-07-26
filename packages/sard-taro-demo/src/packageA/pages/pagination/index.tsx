import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon, Pagination } from 'sard-taro'

import './index.scss'
import { useState } from 'react'

export default () => {
  const [current, setCurrent] = useState(1)

  return (
    <Page className="page-pagination">
      <Demo title="基础使用">
        <Pagination total={100} pageSize={10} />
      </Demo>

      <Demo title="受控的">
        <Pagination
          total={100}
          pageSize={10}
          current={current}
          onChange={setCurrent}
        />
      </Demo>

      <Demo title="显示省略号">
        <Pagination total={100} pageSize={10} ellipsis />
      </Demo>

      <Demo title="简单分页">
        <Pagination total={43} pageSize={10} type="simple" />
      </Demo>

      <Demo title="自定义">
        <Pagination
          total={100}
          pageSize={10}
          prev={<Icon name="left"></Icon>}
          next={<Icon name="right"></Icon>}
          page={(page) =>
            page === 2 ? (
              <Icon prefix="demo-icon" name="emoji-smile"></Icon>
            ) : (
              page
            )
          }
        />
      </Demo>
    </Page>
  )
}
