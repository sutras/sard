import { useRef } from 'react'
import { List, IndexBar, IndexBarRef } from 'sard-taro'

export default () => {
  const indexList = [
    {
      anchor: 'A',
      provinces: ['安徽省', '澳门特别行政区'],
    },
    {
      anchor: 'B',
      provinces: ['北京市'],
    },
    {
      anchor: 'C',
      provinces: ['重庆市'],
    },
    {
      anchor: 'F',
      provinces: ['福建省'],
    },
    {
      anchor: 'G',
      provinces: ['甘肃省', '广东省', '广西壮族自治区', '贵州省'],
    },
    {
      anchor: 'H',
      provinces: ['海南省', '河北省', '河南省', '黑龙江省', '湖北省', '湖南省'],
    },
    {
      anchor: 'J',
      provinces: ['吉林省', '江苏省', '江西省'],
    },
    {
      anchor: 'L',
      provinces: ['辽宁省'],
    },
    {
      anchor: 'N',
      provinces: ['内蒙古自治区', '宁夏回族自治区'],
    },
    {
      anchor: 'Q',
      provinces: ['青海省'],
    },
    {
      anchor: 'S',
      provinces: ['山东省', '山西省', '陕西省', '上海市', '四川省'],
    },
    {
      anchor: 'T',
      provinces: ['台湾省', '天津市'],
    },
    {
      anchor: 'X',
      provinces: ['西藏自治区', '香港特别行政区', '新疆维吾尔自治区'],
    },
    {
      anchor: 'Y',
      provinces: ['云南省'],
    },
    {
      anchor: 'Z',
      provinces: ['浙江省'],
    },
  ]

  const indexBarRef = useRef<IndexBarRef>(null)

  return (
    <>
      <IndexBar ref={indexBarRef} style={{ height: 320 }}>
        {indexList.map((item) => (
          <IndexBar.Item key={item.anchor} title={item.anchor}>
            <List>
              {item.provinces.map((province) => (
                <List.Item key={province} title={province} />
              ))}
            </List>
          </IndexBar.Item>
        ))}
      </IndexBar>

      <List style={{ marginTop: 50 }}>
        <List.Item
          title="scrollTo G"
          linkable
          onClick={() => indexBarRef.current?.scrollTo('G')}
        />
      </List>
    </>
  )
}
