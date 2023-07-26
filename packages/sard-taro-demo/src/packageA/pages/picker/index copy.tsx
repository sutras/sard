// import Demo from '@/components/demo'
// import Page from '@/components/page'
// import {} from 'sard-taro'

// import './index.scss'
// import { Picker, View } from '@tarojs/components'
// import { useState } from 'react'

// export default () => {
//   const array = ['美国', '中国', '巴西', '日本']

//   const objectArray = [
//     {
//       id: 0,
//       name: '美国',
//     },
//     {
//       id: 1,
//       name: '中国',
//     },
//     {
//       id: 2,
//       name: '巴西',
//     },
//     {
//       id: 3,
//       name: '日本',
//     },
//   ]

//   const objectMultiArray = [
//     [
//       {
//         id: 0,
//         name: '无脊柱动物',
//       },
//       {
//         id: 1,
//         name: '脊柱动物',
//       },
//     ],
//     [
//       {
//         id: 0,
//         name: '扁性动物',
//       },
//       {
//         id: 1,
//         name: '线形动物',
//       },
//       {
//         id: 2,
//         name: '环节动物',
//       },
//       {
//         id: 3,
//         name: '软体动物',
//       },
//       {
//         id: 4,
//         name: '节肢动物',
//       },
//     ],
//     [
//       {
//         id: 0,
//         name: '猪肉绦虫',
//       },
//       {
//         id: 1,
//         name: '吸血虫',
//       },
//     ],
//   ]

//   const customItem = '全部'

//   const [index, setIndex] = useState(0)
//   const handlePickerChange = (e) => {
//     console.log('picker发送选择改变，携带值为', e.detail.value)
//     setIndex(e.detail.value)
//   }

//   const [multiIndex, setMultiIndex] = useState([0, 0, 0])
//   const handleMultiPickerChange = (e) => {
//     console.log('picker发送选择改变，携带值为', e.detail.value)

//     setMultiIndex(e.detail.value)
//   }

//   const [multiArray, setMultiArray] = useState([
//     ['无脊柱动物', '脊柱动物'],
//     ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
//     ['猪肉绦虫', '吸血虫'],
//   ])

//   const handleMultiPickerColumnChange = (e) => {
//     console.log('修改的列为', e.detail.column, '，值为', e.detail.value)

//     multiIndex[e.detail.column] = e.detail.value

//     switch (e.detail.column) {
//       case 0:
//         switch (multiIndex[0]) {
//           case 0:
//             multiArray[1] = [
//               '扁性动物',
//               '线形动物',
//               '环节动物',
//               '软体动物',
//               '节肢动物',
//             ]
//             multiArray[2] = ['猪肉绦虫', '吸血虫']
//             break
//           case 1:
//             multiArray[1] = ['鱼', '两栖动物', '爬行动物']
//             multiArray[2] = ['鲫鱼', '带鱼']
//             break
//         }
//         multiIndex[1] = 0
//         multiIndex[2] = 0
//         break
//       case 1:
//         switch (multiIndex[0]) {
//           case 0:
//             switch (multiIndex[1]) {
//               case 0:
//                 multiArray[2] = ['猪肉绦虫', '吸血虫']
//                 break
//               case 1:
//                 multiArray[2] = ['蛔虫']
//                 break
//               case 2:
//                 multiArray[2] = ['蚂蚁', '蚂蟥']
//                 break
//               case 3:
//                 multiArray[2] = ['河蚌', '蜗牛', '蛞蝓']
//                 break
//               case 4:
//                 multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物']
//                 break
//             }
//             break
//           case 1:
//             switch (multiIndex[1]) {
//               case 0:
//                 multiArray[2] = ['鲫鱼', '带鱼']
//                 break
//               case 1:
//                 multiArray[2] = ['青蛙', '娃娃鱼']
//                 break
//               case 2:
//                 multiArray[2] = ['蜥蜴', '龟', '壁虎']
//                 break
//             }
//             break
//         }
//         multiIndex[2] = 0
//         break
//     }
//     console.log(multiIndex)
//     setMultiArray(multiArray.slice())
//     setMultiIndex(multiIndex.slice())
//   }

//   const [date, setDate] = useState('2016-09-01')
//   const handleDateChange = (e) => {
//     console.log('picker发送选择改变，携带值为', e.detail.value)

//     setDate(e.detail.value)
//   }

//   const [time, setTime] = useState('12:01')
//   const handleTimeChange = (e) => {
//     console.log('picker发送选择改变，携带值为', e.detail.value)

//     setTime(e.detail.value)
//   }

//   const [region, setRegion] = useState(['广东省', '广州市', '海珠区'])
//   const handleRegionChange = (e) => {
//     console.log('picker发送选择改变，携带值为', e.detail.value)

//     setRegion(e.detail.value)
//   }

//   return (
//     <Page className="page-Picker">
//       <Demo title="普通选择器">
//         <Picker onChange={handlePickerChange} value={index} range={array}>
//           <View className="Picker">当前选择：{array[index]}</View>
//         </Picker>
//       </Demo>

//       <Demo title="多列选择器">
//         <Picker
//           mode="multiSelector"
//           onChange={handleMultiPickerChange}
//           onColumnChange={handleMultiPickerColumnChange}
//           value={multiIndex}
//           range={multiArray}
//         >
//           <View className="picker">
//             当前选择：{multiArray[0][multiIndex[0]]}，
//             {multiArray[1][multiIndex[1]]}，{multiArray[2][multiIndex[2]]}
//           </View>
//         </Picker>
//       </Demo>

//       <Demo title="时间选择器">
//         <Picker
//           mode="time"
//           start="09:01"
//           end="21:01"
//           onChange={handleTimeChange}
//           value={time}
//         >
//           <View className="picker">当前选择: {time}</View>
//         </Picker>
//       </Demo>

//       <Demo title="日期选择器">
//         <Picker
//           mode="date"
//           start="2015-09-01"
//           end="2017-09-01"
//           onChange={handleDateChange}
//           value={date}
//         >
//           <View className="picker">当前选择: {date}</View>
//         </Picker>
//       </Demo>

//       <Demo title="省市区选择器">
//         <Picker
//           mode="region"
//           onChange={handleRegionChange}
//           value={region}
//           customItem={customItem}
//         >
//           <View className="picker">
//             当前选择：{region[0]}，{region[1]}，{region[2]}
//           </View>
//         </Picker>
//       </Demo>
//     </Page>
//   )
// }
